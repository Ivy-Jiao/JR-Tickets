const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format((info) => {
      if (info.req){
        info.req = {
          method: info.req.method,
          url: info.req.originalUrl,
        };
      }
      if (info.err) {
        info.err = {
          message: info.err.message,
          stack: info.err.stack,
        };
      }
      return info;
    })(),
    winston.format.printf(({timestamp, level, message, ...meta}) => {
      let log = `[${timestamp}] [${level}]: ${message}`;
      if (Object.keys(meta).length > 0){
        log += `${JSON.stringify(meta)}`;
      }

      return log;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename:'logs/combine.log', level: 'info',})
  ],
});

module.exports = logger;
