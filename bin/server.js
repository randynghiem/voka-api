// Server and network configuration

/**
 * Dependencies
 */

var app = require('../app');
var debug = require('debug')('voka-api:server');
var dotenv = require('dotenv');
var http = require('http');

/**
 * Configure environment
 */
dotenv.config({ path: './bin/config.env'});

/**
 * Configure App
 */

var port = process.env.PORT || 443;
app.set('port', port);


/**
 * configure Server
 */

var server = http.createServer(app);
server.listen(port);
server.on('listening', function () {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
});
