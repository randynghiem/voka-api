const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const apiRoutes = require('./routes/api');
const handleNotFound = require('./routes/middleware/not-found');
const handleCatchErrors = require('./routes/middleware/catch-errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Optimize for deployment
 */
app.use(compression());
app.use(helmet());

/**
 * Configure Routing and middlewares
 */
app.use('/api/v1', apiRoutes);

app.use(handleNotFound);
app.use(handleCatchErrors);

module.exports = app;