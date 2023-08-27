const axios = require('axios');
const urlMovies = 'https://api.tvmaze.com/shows';
const Movie = require('../Models/MovieModel')


const getMovies = async ()=>{
    console.log('IN Movies DAL')
    const Movies = await axios.get(urlMovies)
    return Movies
}

const insertMovies = async (MoviesData) => {
    console.log('IN insertMovies DAL')
    const insertedMem = await Movie.insertMany(MoviesData, { timeout: 30000 }); // Increase timeout to 30 seconds
    console.log('Database populated successfully.');
    return insertedMem
}

module.exports = { getMovies , insertMovies};

