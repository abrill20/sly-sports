/**
  Demonstrate some winston functions

  https://github.com/winstonjs/winston

  A logger for just about everything.
*/

// Load the winston library - common name for variable is winston
const winston = require('winston');

// Load the filesystem library - common name for variable is fs
const fs = require('fs');

// Load the path library - common name for variable is path
const path = require('path');

// Define the log directory and make sure it exists
var logDirectory = path.resolve('logs');
console.log(`log dir: ${logDirectory}`);
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Create a logger and setup transports
const logger = winston.createLogger({
  level: 'info',
  levels: winston.config.syslog.levels,
  format: winston.format.json(),
  exitOnError: false,
  transports: [
    //
    // Write to all logs with level `info` and below to `combined.log`
    // Write all logs error (and below) to `error.log`.
    // Write unhandled exceptions to exceptions.log
    new winston.transports.File({ filename: `${logDirectory}/error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${logDirectory}/combined.log` })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: `${logDirectory}/exceptions.log` })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Log some messages
// logger.emerg("An emergency level message");
// logger.alert("An alert level message");
// logger.crit("A critical level message");
// logger.error("An error level message");
// logger.warning("A warning level message");
// logger.notice("A notice level message");

// var a = 1;
// var b = 5;
// logger.debug(`A debug level message: a:${a} b:${b}`);

// var sum = a + b;
// logger.info(`An info level message: sum:${sum}`);

module.exports = logger;