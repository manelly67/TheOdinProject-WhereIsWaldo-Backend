const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFromSessionId = async (sessionId) => {
    return await prisma.player.findUnique({
      where: { 
        sessionId: sessionId 
      },
      select: {
        id: true,
        playername: true,
        sessionId: true,
      },
    });
  };

  const createNewPlayer = async(id,sessionId,req,res) => {
    await prisma.player.create({
      data: {
        id: id,
        sessionId: sessionId,
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
  };

  async function updateName(player_id,name,req,res) {
    await prisma.player.update({
      where:{
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
  };

  async function getFromId(id) {
    return await prisma.player.findUnique({
      where: { 
        id: id 
      },
      select: {
        id: true,
        playername: true,
        sessionId: true,
      },
    });
  }

  module.exports = {
   getFromSessionId,
   createNewPlayer,
   updateName,
   getFromId,
  };