const { stack } = require("../../routes/movie.route");
const logger = require("../../utils/logger");

const finalErrorHandler = (err, req, res, next) => {
  logger.error('Final Error Middleware', {req, err});

  const status = err.status || 500;
  const message = err.message || 'Something unexpected happened';
  res.status(status).json({
    error: {
      message,
       ...(process.env.NODE_ENV === 'development' && {stack: err.stack}),
    }
  });
};

module.exports =  finalErrorHandler;