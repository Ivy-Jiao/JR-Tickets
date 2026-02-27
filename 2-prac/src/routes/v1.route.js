const {Router} = require('express');
const movieRouter = require('./movie.route');

const v1Router = Router();

v1Router.use('/movies', movieRouter);

module.exports = v1Router;