import React, { useState , useEffect} from 'react'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { Grid } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { NavLink } from 'react-router-dom';
import EditMovieComp from './EditMovieComp';
import FindMoviesComp from './FindMoviesComp';
import SubsWatchedComp from './SubsWatchedComp';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';

function AllMoviesComp() {

    const urlMovies = 'http://localhost:8001/movies'
    const location = useLocation();

    const [movies,setmovise] = useState([])
    const [toEdit,settoEdit] = useState(false); 
    const [MovietoEdit,setMovietoEdit] = useState([]); 
    const [IsDeleted,setIsDeleted] = useState(false)  
    const [searchText,setsearchText] = useState('')  
    const [displaypage , setdisplaypage] = useState(false)

    const perms = useSelector(state => state.perms);

    const Checkperms  = () =>{
      const aa = perms.find((perm)=>perm==="Delete Movies")
      if (aa){
        setdisplaypage(true)
      }
    }

    useEffect(()=>{
        Checkperms()
      },[])

    const fetchMovies = async() => {
        const { data } = await axios.get(urlMovies);
        setmovise(data)
    }

    useEffect(()=>{
        fetchMovies();
    },[])

    const handleEdit = (e) => {
        settoEdit(true)
        setMovietoEdit(e)
    } 

    const handleDelete = async(userid) => {
        const {data} = await axios.delete(`${urlMovies}/${userid}`)
        console.log('Deleted Succesfully!') 
        if (data === 'Deleted!'){
            setIsDeleted(true)
        }
    }

    const handlefindmovie = (e) => {
        setsearchText(e)
    }


  const filteredMovies = (searchText) => {
    const filtered = movies.filter((movie) =>
    movie.name && movie.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filtered;
  }


  const displaymovies =  filteredMovies(searchText) || movies

//   const findmov = location.state.movieName;
let findmov
  if(location.state){
    findmov = location.state.movieName
  }

    return (
        <div>
            AllMoviesComp
            <br/>
            {IsDeleted && (
                    <h4 style={{fontFamily: "cursive"}}>Movie has been Deleted successfully</h4>
                )}
            <br/>
            
            {!toEdit ? (
                <>
                <FindMoviesComp callback={handlefindmovie} findmov={findmov}/>         
                {filteredMovies.length === 0 ? (
                    <h4 style={{fontFamily: "cursive"}}>Movie not found !!</h4>
                ):(null)} 
                      <br /><br /><br />
      
                        <Grid container spacing={3}>
                            {displaymovies.map((movie) => (
                                            <Grid item key={movie._id} xs={12} md={6}>
                                    <Card key={movie._id} sx={{ maxWidth: 450 , backgroundColor:'#eae3fc' , color:'#463675' , display: 'flex'}}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Stack spacing={3} direction="row">

                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5">
                                                {movie.name} {movie.premiered.split('-')[0]}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                genres : {movie.genres.map((gen,index)=><li key={index}>{gen}</li>)}
                                            </Typography>      
                                            {/* <Typography> */}
                                            <br/><br/>
                                                <SubsWatchedComp movId={movie._id}/>
                                            {/* </Typography> */}

                                            </CardContent>  
               
                                            <CardMedia
                                            component="img"
                                            sx={{
                                                width: 150, // Adjust the width as needed
                                                height: 300,
                                                objectFit: 'cover', // Maintain the aspect ratio and don't cut the image
                                                left: 0,
                                            }}
                                            image={movie.image.medium}
                                            alt="Live from space album cover"
                                            /> 
                                                        </Stack>

                                            <CardActions>
                                            <NavLink to="EditMovie" underline="none">
                                                <Button size="small" color="primary" onClick={() => handleEdit(movie)}>
                                                Edit
                                                </Button>
                                            </NavLink>
                                            {displaypage ? (
                                            <Button size="small" color="primary" onClick={() => handleDelete(movie._id)}>
                                            Delete
                                            </Button>
                                            ):(null)}
                                        </CardActions>
                                            
                                        </Box>
                                                </Card>
                                            </Grid>
                                            ))}
                                        </Grid>
                                        </>
                                        ) : (
                                        <EditMovieComp movie={MovietoEdit} />
                                    )}
                                    </div>

    )
}

export default AllMoviesComp
