const express = require('express');
const termsRouter = require('./terms-router');

/**
 * Configure specific routes
 */
const apiRouter = express.Router();
apiRouter.use('/terms', termsRouter);

module.exports = apiRouter;