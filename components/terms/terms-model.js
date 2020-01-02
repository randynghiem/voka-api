const mongoose = require('mongoose');
var debug = require('debug')('voka-api:terms-model');

const termsSchema = new mongoose.Schema({
  term: String,
  phonetic: String,
  meaning: String,
  example: String
});

debug("Define a new term model.");
const termsModel = mongoose.model('terms', termsSchema);

module.exports = {
  getTerms: async () => {
    const terms = await termsModel.find({});
    return terms;
  }
};