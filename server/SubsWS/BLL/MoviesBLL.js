const MoviesDAL = require('../DAL/MoviesDAL');
const Movies = require('../Models/MovieModel')

// populate movies in WS - to anable make changes in ws like update, add, delete..
const getMoviesData = async () => {

    const {data:Movies} = await MoviesDAL.getMovies();
    const Moviesdata = [];
    Movies.forEach((movie) => {
        Moviesdata.push({
        name: movie.name,
        genres: movie.genres,
        image: {medium : movie.image.medium},
        premiered: movie.premiered,
      });
    });
    return Moviesdata
}

const PopulateMovies = async () => {
    // const PopulatedMovies = await MoviesDAL.insertMovies(await getMoviesData())
    // return PopulatedMovies
    try {
      const existingMovies = await Movies.find({});
  
      if (existingMovies.length === 0) {
        const PopulatedMovies = await MoviesDAL.insertMovies(await getMoviesData());
        return PopulatedMovies;
      } else {
        return "Movies collection already populated.";
      }
    } catch (error) {
      // Handle any errors that might occur during the process
      console.error("Error populating movies:", error);
      throw error;
    }
}

// GET - Get All - Read
const getAllMovies = () => {
  return Movies.find({});

};

// GET - Get By ID - Read
const getMoviesById = (id) => {
    return Movies.findById({ _id: id });
  };

// Post - Create a new Movies - Create
const addMovies = async (obj) => {
    const mem = new Movies(obj);
    await mem.save();
    return 'Created!';
  };
  
// PUT - Update a Movies - Update
const updateMovies = async (id, obj) => {
  await Movies.findByIdAndUpdate(id, obj);
    return 'Updated!';
  };
  
  
// DELETE - Delete a Movies - Delete
const deleteMovies = async (id) => {
    await Movies.findByIdAndDelete(id);
    return 'Deleted!';
  };


module.exports = { 
    getMoviesData, 
    PopulateMovies,
    getAllMovies,
    getMoviesById,
    addMovies,
    updateMovies,
    deleteMovies,
};
