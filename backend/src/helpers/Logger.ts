import { createLogger, transports, format } from 'winston';
import path from 'path';

const logFile = path.join(__dirname, '../../app.log');

const Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) =>
      stack
        ? `${timestamp} [${level}] ${message}\n${stack}`
        : `${timestamp} [${level}] ${message}`,
    ),
  ),
  transports: [
    new transports.Console({ level: 'info' }),
    new transports.File({ filename: logFile, level: 'info' }),
  ],
  exitOnError: false,
});

export default Logger;
