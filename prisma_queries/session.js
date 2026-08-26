const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFromId = async (sessionId) => {
  return await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });
};

const delSessionsWithoutPlay = async () => {
  
  const playerSessionIds = await prisma.player.findMany({
    select: { sessionId: true },
    distinct: ["sessionId"],
  });

  const idsToKeep = playerSessionIds.map((p) => p.sessionId);

  const result = await prisma.session.deleteMany({
    where: {
      id: {
        notIn: idsToKeep,
      },
    },
  });

  return result.count; // opcional, útil para logs o debugging
};


module.exports = {
  getFromId,
  delSessionsWithoutPlay,
};
