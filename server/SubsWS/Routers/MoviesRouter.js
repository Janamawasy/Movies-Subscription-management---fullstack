const express = require('express');
const MoviesBLL = require('../BLL/MoviesBLL');

const router = express.Router();

// 'http://localhost:8001/movies' is the Entry Point

// Get All movies
router.route('/').get(async (req, res) => {
  try {
    // Populate movie data
    await MoviesBLL.PopulateMovies();

    // Fetch all movies data
    const movies = await MoviesBLL.getAllMovies();
    res.json(movies); // 200 - OK
  } catch (error) {
    console.error(error);
    res.json('There was an error!');
  }
});



// Get movie by ID
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const Subs = await MoviesBLL.getMoviesById(id);
    res.json(Subs);
  });

// Add a new movie
router.route('/').post(async (req, res) => {
    const obj = req.body;
    const result = await MoviesBLL.addMovies(obj);
    res.status(201).json(result);
  });
  
  // Update a Movie
  router.route('/:id').put(async (req, res) => {
    try {
      const { id } = req.params;
      const obj = req.body;
      const result = await MoviesBLL.updateMovies(id, obj);
      res.json(result);
    } catch (error) {
      res.status(500).json('There was an error!');
    }
  });
  
  // Delete a movie
  router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const result = await MoviesBLL.deleteMovies(id);
    res.json(result);
  });


module.exports = router;