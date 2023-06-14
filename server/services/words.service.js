const testData = require("../static/TestData.json");

class WordsService {
  static getRandomWordByPartOfSpeech(wordsList, pos) {
    const words = wordsList.filter(word => word.pos === pos);
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  static getWords() {
    try {
      const wordsList = testData.wordList;
      const selectedWords = [];
      const adjective = this.getRandomWordByPartOfSpeech(
        wordsList,
        "adjective"
      );
      selectedWords.push(adjective);

      // Select at least 1 adverb
      const adverb = this.getRandomWordByPartOfSpeech(wordsList, "adverb");
      selectedWords.push(adverb);

      // Select at least 1 noun
      const noun = this.getRandomWordByPartOfSpeech(wordsList, "noun");
      selectedWords.push(noun);

      // Select at least 1 verb
      const verb = this.getRandomWordByPartOfSpeech(wordsList, "verb");
      selectedWords.push(verb);

      // Select the remaining words randomly
      const remainingWords = wordsList.filter(
        word =>
          word !== adjective &&
          word !== adverb &&
          word !== noun &&
          word !== verb
      );
      // fill the array with other words
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * remainingWords.length);
        selectedWords.push(remainingWords[randomIndex]);
        remainingWords.splice(randomIndex, 1);
      }
      return selectedWords;
    } catch (error) {
      console.log(error);
    }
  }

  static getRank(params) {
    const { finalScore } = params;
    const scoresList = testData.scoresList;

    const lowerScores = scoresList.filter(score => score < finalScore);
    const rankPercentage = lowerScores.length / scoresList.length * 100;
    const rank = Math.round(rankPercentage * 100) / 100;
    return rank;
  }
}
module.exports = WordsService;
