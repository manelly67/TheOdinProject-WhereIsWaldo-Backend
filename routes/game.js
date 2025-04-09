const { Router } = require("express");
const gameController = require("../controllers/game");

const router = Router();

router.get("/new/:img_id/:player_id", gameController.newGameGet);
router.post("/new/:img_id/:player_id", gameController.newGamePost);

router.put("/round/:game_id", gameController.roundResult);

router.get("/top-5/:img_id", gameController.getTop5);
router.get("/top-10/:img_id", gameController.getTop10);

module.exports = router;
