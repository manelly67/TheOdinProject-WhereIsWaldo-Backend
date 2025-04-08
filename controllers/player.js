const { v4: uuidv4 } = require("uuid");
const db_players = require("../prisma_queries/players");

async function getPlayer(req, res) {
  const sessionId = req.sessionID;
  const player = await db_players.getFromSessionId(sessionId);
 
  if (player === undefined || player === null) {
    return res.status(200).json({
      SessionID: `${sessionId}`,
    });
  } else {
    return res.status(200).json({
      SessionID: `${sessionId}`,
      player,
    });
  } 
}

// create a player for the session if there is no player yet
async function postPlayer(req, res) {
  const sessionId = req.sessionID;
  const player = await db_players.getFromSessionId(sessionId);
 
  if (player === undefined || player === null) {
    const id = uuidv4();
    await db_players.createNewPlayer(id,sessionId);
    const newPlayer = await db_players.getFromSessionId(sessionId);
    return res.status(200).json({
      player: newPlayer,
    });
  } else {
    return res.status(200).json({
      player,
    });
  }
}

async function getBySessionId(req, res) {
  let { session_id } = req.params;
  const player = await db_players.getFromSessionId(session_id);
 
  if (player === undefined || player === null) {
    return res.status(400).json({
      message: "player does not exist",
    });
  } else {
    return res.status(200).json({
      player,
    });
  }
}

module.exports = { getPlayer, postPlayer, getBySessionId };
