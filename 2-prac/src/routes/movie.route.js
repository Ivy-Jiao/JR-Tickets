const {Router} = require('express');
const { createMovie, getAllMovies, getMovieById, updateMovieById, deleteMovieById, createMovieReview, getMovieReviews } = require('../controllers/movie.controller');

const movieRouter = Router();

movieRouter.post('/', createMovie);
movieRouter.get('/', getAllMovies);
movieRouter.get('/:id', getMovieById);
movieRouter.put('/:id', updateMovieById);
movieRouter.delete('/:id', deleteMovieById);

movieRouter.post('/:id/reviews', createMovieReview);
movieRouter.get('/:id/reviews', getMovieReviews);

module.exports = movieRouter;


