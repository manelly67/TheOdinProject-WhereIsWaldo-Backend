const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFromSessionId = async (sessionId) => {
  return await prisma.player.findUnique({
    where: {
      sessionId: sessionId,
    },
    select: {
      id: true,
      playername: true,
      sessionId: true,
    },
  });
};

const getPlayerById = async (player_id) => {
  return await prisma.player.findUnique({
    where: {
      id: player_id,
    },
    select: {
      id: true,
      playername: true,
      sessionId: true,
      Game: {
        select: {
          id: true,
          pictureId: true,
          status: true,
          timeRecord: true,
        },
      },
    },
  });
};

const createNewPlayer = async (id, sessionId) => {
  await prisma.player
    .create({
      data: {
        id: id,
        sessionId: sessionId,
      },
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (err) => {
      if (err) {
        console.log(err);
      } else {
        await prisma.$disconnect();
        process.exit(1);
      }
    });
};

async function updateName(player_id, name) {
  await prisma.player
    .update({
      where: {
        id: player_id,
      },
      data: {
        playername: name,
      },
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (err) => {
      if (err) {
        console.log(err);
      } else {
        await prisma.$disconnect();
        process.exit(1);
      }
    });
}

async function getFromId(id) {
  return await prisma.player.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      playername: true,
      sessionId: true,
    },
  });
}

async function delAbandonedGames() {
  const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
  const threshold = new Date(Date.now() - THREE_DAYS_MS);

  const expiredSessions = await prisma.session.findMany({
    where: {
      expiresAt: { lt: threshold },
    },
    select: { id: true },
  });

  const expiredSessionIds = expiredSessions.map((s) => s.id);

  const playersWithoutEndedGames = await prisma.player.findMany({
    where: {
      sessionId: { in: expiredSessionIds },
      Game: {
        none: { status: "ENDED" },
      },
    },
    select: { id: true },
  });

  const playerIds = playersWithoutEndedGames.map((p) => p.id);

   if (playerIds.length === 0) {
    return { gamesDeleted: 0, playersDeleted: 0 };
  }

  const deletedGames = await prisma.game.deleteMany({
    where: {
      playerId: { in: playerIds },
      status: "GAMING",
    },
  });

  const deletedPlayers = await prisma.player.deleteMany({
    where: { id: { in: playerIds } },
  });

  return {
    gamesDeleted: deletedGames.count,
    playersDeleted: deletedPlayers.count,
  };


  
}

module.exports = {
  getFromSessionId,
  getPlayerById,
  createNewPlayer,
  updateName,
  getFromId,
  delAbandonedGames,
};
