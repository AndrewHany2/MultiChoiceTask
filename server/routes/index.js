const wordsRouter = require("./words.router.js");

const addRoutes = app => {
  app.use("/api/words", wordsRouter);
};

module.exports = addRoutes;
