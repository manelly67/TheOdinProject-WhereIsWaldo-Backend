// GET /
async function get(req, res) {
  return res.status(200).json({
    message: "Welcome to WALDO THE GAME",
  });
}

module.exports = { get };
