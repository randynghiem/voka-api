const express = require('express');
const termRouter = require('./terms-router');

/**
 * Configure specific routes
 */
const apiRouter = express.Router();
apiRouter.use('/terms', termRouter);

module.exports = apiRouter;