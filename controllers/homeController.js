// GET /
const db_sessions = require("../prisma_queries/session");

async function get(req, res) {
  try {
    await db_sessions.delSessionsWithoutPlay();
   
    return res.status(200).json({
      message: "Welcome to WALDO THE GAME",
    });

    
  } catch (error) {
    console.error("Error en homepageController:", error);
    res.status(500).send("Error interno del servidor");
  }
}

async function getSessionId(req, res) {
  const sessionId = req.sessionID;
  return res.status(200).json({
    SessionID: `${sessionId}`,
  });
}

module.exports = { get, getSessionId };
