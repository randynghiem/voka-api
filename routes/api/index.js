const express = require('express');
const termsRouter = require('./terms-router');
const captionsRouter = require('./captions-router');
const setsRouter = require('./sets-router');

/**
 * Configure specific routes
 */
const apiRouter = express.Router();
apiRouter.use('/terms', termsRouter);
apiRouter.use('/captions', captionsRouter);
apiRouter.use('/sets', setsRouter);

module.exports = apiRouter;