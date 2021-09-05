import ENV from './config/env';
import http from 'http';
import app from './middleware';
import debug from 'debug';

const server = http.createServer(app);
const logger = debug(ENV.DEBUG);

app.set('port', ENV.PORT);
server.listen(ENV.PORT);
server.on('error', onError);
server.on('listening', onListening);

export default server;

/** ================================================================================== */
/** functions */
function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof ENV.PORT === 'string' ? `Pipe ${ENV.PORT}` : `Port ${ENV.PORT}`;

  /** handle specific listen errors with friendly messages */
  switch (error.code) {
    case 'EACCES':
      throw new Error(`${bind} requires elevated privileges`);
    case 'EADDRINUSE':
      throw new Error(`${bind} is already in use`);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = addr ? (typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`) : '';
  logger(`Listening on ${bind}`);
}
