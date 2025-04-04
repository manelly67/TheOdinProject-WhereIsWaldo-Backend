const { v4: uuidv4 } = require("uuid");
const db_players = require("../prisma_queries/players");

async function getNew(req, res) {
   /*  return res.status(200).json({
      message: "Welcome to WALDO THE GAME",
    }); */
  }

  async function postNew(req, res) {
   /*  return res.status(200).json({
      message: "Welcome to WALDO THE GAME",
    }); */
  }

  async function getBySessionId(req,res){
    let { session_id } = req.params;
    const player = await db_players.getFromSessionId(session_id);
    console.log(player);
    if (player === undefined || player === null) {
      return res.status(400).json({
        player: "player does not exist",
      });
    } else {
      return res.status(200).json({
        player,
      });
    }

  }
  
  module.exports = { getNew, postNew, getBySessionId };