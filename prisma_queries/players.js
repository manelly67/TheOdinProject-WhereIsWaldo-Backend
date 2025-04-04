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

  const getFromId = async (id) => {
    return await prisma.player.findUnique({
      where: { id: id },
      include: {
        id: true,
        playername: true,
        sessionId: true,
      },
    });
  };

  module.exports = {
   getFromSessionId,
   getFromId,
  };