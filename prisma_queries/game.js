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
        return res.status(400).json({
          err_code: err.code,
          err_meta: err.meta,
        });
      }else{
        await prisma.$disconnect();
        process.exit(1);
      }
    });
  }


  module.exports = { getActiveByImgAndPlayer, getById ,createNewGame };