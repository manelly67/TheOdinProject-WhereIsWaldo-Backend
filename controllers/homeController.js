// GET /
async function get(req, res) {
  return res.status(200).json({
    message: "Welcome to WALDO THE GAME",
  });
}

async function getSessionId(req, res) {
  const sessionId = req.sessionID;
  return res.status(200).json({
    SessionID: `${sessionId}`,
  });
}



module.exports = { get, getSessionId };
