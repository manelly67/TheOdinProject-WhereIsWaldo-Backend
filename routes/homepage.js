const { Router } = require("express");
const homeController  = require("../controllers/homeController");

const router = Router();

router.get("/", homeController.get);

router.get('/session-id', homeController.getSessionId);



module.exports = router;