require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const v1Router = require('./routes/v1.route');
const logger = require('./utils/logger');
const setupSwagger = require('./utils/swagger');

const app = express();

// Security middleware
app.use(helmet());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Setup logging with morgan + winston
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.use(cors());
app.use(express.json());

// Setup Swagger UI
setupSwagger(app);

app.use('/v1', v1Router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});