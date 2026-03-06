const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
},
{
  timestamps: true, //createdAt, updatedAt
},
);

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'description is required'],
    trim: true,
  },
  types: {
    type: [String], // string array
    validate: {
      validator: (types) => {
        Array.isArray(types) && types.length > 0
      },
      message: 'Invalid types'
    },
  },
  averageRating: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema]
});

//hooks (middleware)
movieSchema.pre('save', function() {
  if(this.reviews.length > 0){
    const ratingSum = this.reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = ratingSum / this.reviews.length;
    const parsedAverageRating =  parseFloat(averageRating.toFixed(2));
    this.averageRating = parsedAverageRating;
  } else {
    this .averageRating = 0;
  }
});

module.exports = mongoose.model('Movie', movieSchema);