const { Router } = require("express");
const playerController  = require("../controllers/player");

const router = Router();

router.get("/player_for_session", playerController.getPlayer);
router.post("/player_for_session", playerController.postPlayer);

router.get("/:session_id", playerController.getBySessionId);

module.exports = router;