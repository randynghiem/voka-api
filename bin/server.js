// Server and network configuration

/**
 * Dependencies
 */

var app = require('../app');
var debug = require('debug')('voka-api:server');
var http = require('http');

/**
 * Configure App
 */

var port = process.env.PORT || 8080;
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
