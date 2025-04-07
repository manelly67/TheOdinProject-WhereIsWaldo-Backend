const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFromId = async (sessionId) => {
    return await prisma.session.findUnique({
      where: { 
        id: sessionId 
      },
    });
  };

  module.exports = {
    getFromId,
    
   };