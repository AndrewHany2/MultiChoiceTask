const { WordsService } = require("../services");

class WordsController {
  async getWords(req, res, next) {
    try {
      const words = WordsService.getWords();
      res.json(words);
    } catch (error) {
      console.log(error);
    }
  }

  async getRank(req, res, next) {
    try {
      const rank = WordsService.getRank(req.body);
      res.json(rank);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new WordsController();
