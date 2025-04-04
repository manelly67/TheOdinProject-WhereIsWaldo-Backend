const { Router } = require("express");
const homeController  = require("../controllers/homeController");

const router = Router();

router.get("/", homeController.get);

module.exports = router;