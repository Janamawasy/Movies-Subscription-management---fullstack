import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

function AddMovieComp() {
    const urlMovies = 'http://localhost:8001/movies'


    const [name,setname] = useState('')
    const [genres,setgenres] = useState([])
    const [imageURL,setimageURL] = useState('')
    const [premiered,setpremiered] = useState('')
    const [IsSaved,setIsSaved] = useState(false) 
    const [isCanceled,setisCanceled] = useState(false) 

    const handleSave = async () => {
        const obj = {
            name: name,
            genres: genres,
            image : {medium : imageURL},
            premiered : premiered}

        const {data:movdata} = await axios.post(`${urlMovies}`,obj)
        if (movdata === "Created!"){
            setIsSaved(true)
        }
    } 

    // useEffect(() => {
    //     if (isCanceled) {
    //       window.location.href = '/main/MoviesPage'; // Redirect to "/main/UsersPage"
    //     }
    //   }, [isCanceled]);

    return (
        <div>
            {IsSaved && (
                    <h3 style={{fontFamily: "monospace"}}>user has been Added successfully</h3>
                )}
            <br/>
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Movie's Name" variant="outlined" onChange={(e)=>setname(e.target.value)}/>
                <TextField id="outlined-basic" label="Genres" variant="outlined" onChange={(e)=>setgenres(e.target.value.split(','))}/><br/>
                <TextField id="outlined-basic" label="Image url" variant="outlined" onChange={(e)=>setimageURL(e.target.value)}/>
                <TextField id="outlined-basic" label="Premiered" variant="outlined" type='Date' onChange={(e)=>setpremiered(e.target.value)}/>
            </Box>
            <br/><br/>
            <Stack spacing={3} direction="row">
                <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: '#521482' }}>Save</Button>
                <NavLink to='/main' underline="none">
                    <Button variant="contained" sx={{ backgroundColor: '#521482' }}>Cancle</Button>
                </NavLink>
            </Stack>

        </div>
    )
}

export default AddMovieComp
