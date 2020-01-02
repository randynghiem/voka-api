const express = require('express');
const termsModel = require('../../components/terms');

const termsRouter = express.Router();

/**
 * Define route handler
 */

const getTerms = async (req, res, next) => {
  //validation
  const terms = await termsModel.getTerms();

  res.status(200).json(terms);
}

/**
 * Assign handlers to each route
 */

termsRouter.get('/', getTerms);

module.exports = termsRouter;