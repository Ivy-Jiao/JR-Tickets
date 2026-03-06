require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const v1Router = require('./routes/v1.route');
const logger = require('./utils/logger');
const setupSwagger = require('./utils/swagger');
const finalErrorHandler = require('./middleware/error/final.error.middleware');
const connectDB = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 3000;
// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  skip: () => process.env.NODE_ENV !== 'production'
});

// Security middleware
app.use(helmet());
app.use(limiter);
// Setup logging with morgan + winston
app.use(morgan( (process.env.NODE_ENV !== 'development' ? 'combined' : 'dev'), {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));
app.use(cors());
app.use(express.json());
// Setup Swagger UI
setupSwagger(app);
app.use('/v1', v1Router);
app.use(finalErrorHandler);

connectDB().then(()=> {
  app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });
});