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
    const [MissingInfo, setMissingInfo] = useState(false)
    const [info, setinfo] = useState('')

    const handleSave = async () => {
        if (name && imageURL){
            const obj = {
                name: name,
                genres: genres,
                image : {medium : imageURL},
                premiered : premiered}
    
            const {data:movdata} = await axios.post(`${urlMovies}`,obj)
            if (movdata === "Created!"){
                // setIsSaved(true)
                setinfo('user has been Added successfully')
            }
        }else{
            // setMissingInfo(true)
            setinfo('missing information, make sure to enter the movie name and image url')
        }
        
    }


    return (
        <div>
                <h3 style={{fontFamily: "monospace"}}>{info}</h3>
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
