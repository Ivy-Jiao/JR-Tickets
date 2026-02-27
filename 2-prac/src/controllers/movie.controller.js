
const movies =[];
let nextMovieId = 1;
let nextReviewId = 1;


const createMovie = (req,res,next) =>{
  //before get data, data validation first.
  const {title, description, types} = req.body; //add app.use(express.json()); in index.js for project
  if(!title || !description || !Array.isArray(types) || types.length === 0) {
    return res.status(400).json({
      message: "Title, description and types are required"
    });
  }

  const movie = {
    id: nextMovieId++,
    title,
    description,
    types,
    averageRating: 0,
    reviews: [],
  }
  // add movie first of line
  movies.unshift(movie);
  res.status(201).json(movie);
};

const getAllMovies = (req,res,next) =>{
  //search
  const { keyword, sort, page =1, limit = 10 } = req.query;
  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 10;
  // shallow copy -  deep copy
  let filteredMovies = [...movies];

  if(keyword){
    filteredMovies = filteredMovies.filter(
      (movie) => 
      movie.title.toLowerCase().includes(keyword.toLowerCase()) || 
      movie.description.toLowerCase().includes(keyword.toLowerCase()));
  }

  if(sort === 'rating'){
    filteredMovies.sort((a,b) => a.averageRating - b.averageRating);
  } else if (sort === '-rating'){
    filteredMovies.sort((a,b) => b.averageRating - a.averageRating);
  }

  // page
  const startIndex = (parsedPage - 1) * parsedLimit;
  const endIndex = startIndex + parsedLimit;

  res.json(filteredMovies.slice(startIndex, endIndex));
};

const getMovieById = (req,res,next) =>{
  const { id: movieId } = req.params;
  const movie = movies.find(m => m.id === Number(movieId));
  if(!movie){
    return res.status(404).json({
      message: `movie ${movieId} not found`
    });
  }

  return res.json(movie);
};

const updateMovieById = (req,res,next) =>{
  const { id: movieId } = req.params;
  const { title, description, types } = req.body; //add app.use(express.json()); in index.js for project
  
  const movie = movies.find(m => m.id ===  Number(movieId));
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
  const movieIndex = movies.findIndex(m => m.id === Number(movieId));
  if(movieIndex === -1){
    return res.status(404).json({
      message: `movie ${movieId} not found`
    });
  }

  movies.splice(movieIndex, 1);
  res.status(204).send();
};

const createMovieReview = (req,res,next) =>{
  const { id: movieId } = req.params;
  const {content, rating} = req.body;

  if(!content || !rating || Number(rating) < 1 || Number(rating) > 5){
    return res.status(400).json({
      message: 'Content is required and rating must be between 1 and 5'
    });
  }

  const movie = movies.find(m => m.id === Number(movieId));
  if(!movie){
    return res.status(404).json({
      message: `movie ${movieId} not found`
    });
  }

  const review = {
    id: nextMovieId++,
    content,
    rating: Number(rating),
  }

  movie.reviews.push(review);
  movie.averageRating = +((movie.reviews.reduce((sum, review) => sum+review.rating, 0) / movie.reviews.length).toFixed(2));

  return res.status(201).json(review);
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