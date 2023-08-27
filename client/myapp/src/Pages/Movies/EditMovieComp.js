import {React, useState , useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

function EditMovieComp({movie}) {
    const urlMovies = 'http://localhost:8001/movies'

    const [name,setname] = useState(movie.name)
    const [genres,setgenres] = useState(movie.genres)
    const [imgurl,setimgurl] = useState(movie.image.medium)
    const [premiered,setpremiered] = useState(movie.premiered)
    const [isedited,setisedited] = useState(false) //isCanceled
    const [isCanceled,setisCanceled] = useState(false)
    const [displaypage , setdisplaypage] = useState(false)

    const perms = useSelector(state => state.perms);

    const Checkperms  = () =>{
      const aa = perms.find((perm)=>perm==="Update Movies")
      if (aa){
        setdisplaypage(true)
      }
    }

    useEffect(()=>{
        Checkperms()
      },[])


    const handleEdit = async() => {
        const obj = {
            name : name,
            genres : genres,
            image: {medium : imgurl},
            premiered:premiered
        }
        const {data} = await axios.put(`${urlMovies}/${movie._id}`,obj)
        console.log('data',data)
        if (data==='Updated!'){
            setisedited(true)
        }else {
            console.log('Unexpected response:', data);
        }
        
    }

    // useEffect(() => {
    //     if (isCanceled) {
    //       window.location.href = '/main/MoviesPage'; // Redirect to "/main/UsersPage"
    //     }
    //   }, [isCanceled]);

    return (
        <div>
            {displaypage ? (
                <div>
                EditMovieComp
                <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Movie's Name" variant="outlined" defaultValue={movie.name} onChange={(e)=>setname(e.target.value)}/>
                    <TextField id="outlined-basic" label="Genres" variant="outlined" defaultValue={movie.genres} onChange={(e)=>setgenres(e.target.value.split(','))}/><br/>
                    <TextField id="outlined-basic" label="Image Url" variant="outlined" defaultValue={movie.image.medium} onChange={(e)=>setimgurl(e.target.value)}/>
                    <TextField id="outlined-basic" label="Premired" variant="outlined" value={premiered} type='Date' onChange={(e)=>setpremiered(e.target.value)}/>
                </Box>   
                <Stack spacing={3} direction="row">
                    <Button variant="contained" onClick={handleEdit} sx={{ backgroundColor: '#521482' }}>Edit</Button>
                    <NavLink to='/main' underline="none">
                        <Button variant="contained" sx={{ backgroundColor: '#521482' }}>Cancle</Button>
                    </NavLink>
                </Stack>
                <br/><br/>
                {isedited && (
                    <h4 style={{fontFamily: "cursive"}}>Movie has been edited successfully</h4>
                )}
                </div>
                ) : (
                    <h2 style={{ fontFamily: "cursive" }}>No permission to enter this page</h2>
                )}  
        </div>
    )
}

export default EditMovieComp
