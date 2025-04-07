const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCharacters = async (img_id) => {
    return await prisma.character.findMany({
      where: { 
        imageAboutId: img_id,
      },
    });
  };

  const getCharDetailsById = async (char_id) => {
    return await prisma.character.findUnique({
      where: { 
        id: char_id,
      },
    });
  };

module.exports = { getCharacters, getCharDetailsById };