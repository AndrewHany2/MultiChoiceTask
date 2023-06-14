const express = require("express");
const { WordsController } = require("../controllers");
const router = express.Router();

router.get("/", WordsController.getWords);
router.post("/rank", WordsController.getRank);

module.exports = router;
