const { Router } = require("express");
const playerController  = require("../controllers/player");

const router = Router();

router.get("/player_for_session", playerController.getPlayer);
router.post("/player_for_session", playerController.postPlayer);

router.put("/update/:player_id", playerController.updatePlayerName);

router.get("/:session_id", playerController.getBySessionId);

router.get("/id/:player_id", playerController.getPlayerById);

module.exports = router;