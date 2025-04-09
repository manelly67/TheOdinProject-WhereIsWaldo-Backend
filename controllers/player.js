const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");
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
    await db_players.createNewPlayer(id, sessionId, req, res);
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

// validate name
const msgErr = "Name exceeds characters allowed.";
const validateName = [
  body("name")
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage(`${msgErr}: 20`),
];

const updatePlayerName = [
  validateName,
  async (req, res) => {
    const { player_id } = req.params;
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "name could not be updated",
        errors: errors.array(),
      });
    }
    await db_players.updateName(player_id, name, req, res);
    const updatedPlayer = await db_players.getFromId(player_id);
    return res.status(200).json({
      message: "player name was updated",
      player: updatedPlayer,
    });
  },
];

module.exports = { getPlayer, postPlayer, getBySessionId, updatePlayerName };
