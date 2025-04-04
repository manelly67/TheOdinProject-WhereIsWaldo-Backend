const { Router } = require("express");
const playerController  = require("../controllers/player");

const router = Router();

router.get("/new", playerController.getNew);
router.post("/new", playerController.postNew);

router.get("/:session_id", playerController.getBySessionId)

module.exports = router;