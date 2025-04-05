const { Router } = require("express");
const gameController  = require("../controllers/game");

const router = Router();

router.get("/new/:img_id/:player_id", gameController.newGameGet);
router.post("/new/:img_id/:player_id", gameController.newGamePost);



module.exports = router;