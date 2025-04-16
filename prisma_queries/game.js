const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getActiveByImgAndPlayer = async (img_id,player_id) => {
    return await prisma.game.findMany({
      where: { 
        AND:{
            pictureId:{
              equals: img_id,
            },
            playerId:{
              equals: player_id,
            },
            status:{
              equals: 'GAMING',
            },
        }
      },
    });
  };

  const getActiveOrEndByImgAndPlayer = async (img_id,player_id) => {
    return await prisma.game.findMany({
      where: { 
        AND:{
            pictureId:{
              equals: img_id,
            },
            playerId:{
              equals: player_id,
            },
            OR:[
            {
              status:{
                equals: 'GAMING',
              },
            },
            {
              status:{
                equals: 'ENDED',
              },
            },
            ],
        }
      },
    });
  };


const getById = async(id)=>{
  return await prisma.game.findUnique({
    where:{
      id: id,
    },
    select:{
      id: true,
      startedAt: true,
      finishedAt: true,
      timeRecord: true,
      timeInSeconds: true,
      player: {
        select: {
          id: true,
          playername: true,
          sessionId: true,
          session: {
            select: {
              expiresAt: true,
            },
          },
        },
      },
      picture:{
        select: {
          id: true,
          title: true,
          src_image: true,
        },
      },
      targets: true,
      status: true,
    },
  });
};

const getSortBySeconds = async(image_id)=>{
  return await prisma.game.findMany({
    where: {
      AND: {
        pictureId: {
          equals: image_id,
        },
        status: {
          equals: 'ENDED',
        },
      },
    },
    orderBy: {
      timeInSeconds: 'asc',
    },
    select:{
      id: true,
      timeRecord: true,
      timeInSeconds: true,
      player: {
        select: {
          id: true,
          playername: true,
        },
      },
      picture:{
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const createNewGame = async(id,player_id,img_id,targets) => {
    await prisma.game.create({
      data: {
        id: id,
        playerId: player_id,
        pictureId: img_id,
        targets: targets,
      },
    })
    .then(
      async () => {
        await prisma.$disconnect();
      }
    )
    .catch(async (err) => {
      if(err){
        console.log(err);
      }else{
        await prisma.$disconnect();
        process.exit(1);
      }
    });
  };

  async function updateGameStatus(game,newStatus) {
    await prisma.game.update({
      where:{
        id: game.id,
      },
      data: {
        startedAt: game.startedAt,
        timeRecord: game.timeRecord,
        playerId: game.playerId,
        pictureId: game.pictureId,
        targets: game.targets,
        status: newStatus,
      },
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (err) => {
      if(err){
        console.log(err);
      }else{
        await prisma.$disconnect();
        process.exit(1);
      }
    });
  };

  async function updateGameTargets(game,newTargets) {
    await prisma.game.update({
      where:{
        id: game.id,
      },
      data: {
        startedAt: game.startedAt,
        timeRecord: game.timeRecord,
        playerId: game.playerId,
        pictureId: game.pictureId,
        targets: newTargets,
        status: game.status,
      },
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (err) => {
      if(err){
        console.log(err);
      }else{
        await prisma.$disconnect();
        process.exit(1);
      }
    });
  };

  async function finishTheGame(game,scoreObject,newStatus) {
    await prisma.game.update({
      where:{
        id: game.id,
      },
      data: {
        startedAt: game.startedAt,
        finishedAt: scoreObject.end,
        timeRecord: scoreObject.score,
        timeInSeconds: Number(scoreObject.seconds),
        playerId: game.playerId,
        pictureId: game.pictureId,
        targets: game.targets,
        status: newStatus,
      },
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (err) => {
      if(err){
        console.log(err);
      }else{
        await prisma.$disconnect();
        process.exit(1);
      }
    });
  };



  module.exports = {
    getActiveByImgAndPlayer,
    getActiveOrEndByImgAndPlayer,
    getById,
    createNewGame,
    updateGameStatus,
    updateGameTargets,
    finishTheGame,
    getSortBySeconds,
  };