const Movie = require('../models/movie.model');

let nextMovieId = 1;
let nextReviewId = 1;


const createMovie = async (req,res,next) => {
  //before get data, data validation first.
  const {title, description, types} = req.body; //add app.use(express.json()); in index.js for project
  if(!title || !description || !Array.isArray(types) || types.length === 0) {
    return res.status(400).json({
      message: "Title, description and types are required"
    });
  }
  
  const movie = await Movie.create({title, description, types});

  res.status(201).json(movie);
};

const getAllMovies = async (req,res,next) =>{
  //search
  const { keyword, sort, page =1, limit = 10 } = req.query;
  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 10;
  // shallow copy -  deep copy
  // let filteredMovies = [...movies];
  const filter = {};

  if(keyword){
    // query operator
    filter.$or = [{
      title: {$regex: keyword, $options: 'i'},// i：case-insensitive
      description: {$regex: keyword, $option: 'i'}
    }];
    // filteredMovies = filteredMovies.filter(
    //   (movie) => 
    //   movie.title.toLowerCase().includes(keyword.toLowerCase()) || 
    //   movie.description.toLowerCase().includes(keyword.toLowerCase()));
  }

  const sortOption = {};
  if(sort === 'rating'){
    // filteredMovies.sort((a,b) => a.averageRating - b.averageRating);
    sortOption.averageRating = 1;
  } else if (sort === '-rating'){
    // filteredMovies.sort((a,b) => b.averageRating - a.averageRating);
    sortOption.averageRating = -1;
  }

  // page
  const startIndex = (parsedPage - 1) * parsedLimit;
  // const endIndex = startIndex + parsedLimit;

  const movies = await Movie.find(filter).sort(sortOption).skip(startIndex).limit(parsedLimit).exec();

  res.json(movies);
};

const getMovieById = async (req,res,next) =>{
  const { id: movieId } = req.params;
  const movie = await Movie.findById(movieId).exec();
  if(!movie){
    return res.status(404).json({
      message: `movie ${movieId} not found`
    });
  }

  return res.json(movie);
};

const updateMovieById = async (req,res,next) =>{
  const { id: movieId } = req.params;
  const { title, description, types } = req.body; //add app.use(express.json()); in index.js for project

  const movie = await Movie.findById(movieId).exec();
  if (!movie) {
    return res.status(404).json({
      message: `movie ${id} not found`
    });
  }

  if (title !== undefined) movie.title = title;
  if (description !== undefined) movie.description = description;
  if (types !== undefined) {
    if (!Array.isArray(types) || types.length === 0) {
      return res.status(400).json({
        message: "Types must be a non-empty array"
      });
    }
    movie.types = types;
  }

  return res.json(movie);
};

const deleteMovieById = (req,res,next) =>{
  const { id: movieId } = req.params;
  const movieIndex = Movie.findById(m => m.id === Number(movieId));
  if(movieIndex === -1){
    return res.status(404).json({
      message: `movie ${movieId} not found`
    });
  }

  movies.splice(movieIndex, 1);
  res.status(204).send();
};

const createMovieReview = async (req,res,next) =>{
  const { id: movieId } = req.params;
  const {content, rating} = req.body;

  if(!content || !rating || Number(rating) < 1 || Number(rating) > 5){
    return res.status(400).json({
      message: 'Content is required and rating must be between 1 and 5'
    });
  }

  // const movie = movies.find(m => m.id === Number(movieId));
  const movie = await Movie.findById(movieId).exec();
  if(!movie){
    return res.status(404).json({
      message: `movie ${movieId} not found`
    });
  }

  const review = {
    // id: nextMovieId++,
    content,
    rating,
  }

  movie.reviews.push(review);
  // movie.averageRating = +((movie.reviews.reduce((sum, review) => sum+review.rating, 0) / movie.reviews.length).toFixed(2));
  await movie.save();

  return res.status(201).json(movie.reviews[movie.reviews.length - 1]);
};

const getMovieReviews = (req,res,next) =>{
  const { id: movieId } = req.params;
  const movie = movies.find(m => m.id === Number(movieId));
  if(!movie){
    return res.status(404).json({
      message: `movie ${movieId} not found`
    });
  }

  res.json(movie.reviews);
};


module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  createMovieReview,
  getMovieReviews,
}