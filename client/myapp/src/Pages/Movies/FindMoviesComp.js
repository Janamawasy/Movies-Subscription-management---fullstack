import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function FindMoviesComp({callback, findmov}) {
    const [movname,setmovname] = useState('');

    const handlefind = () => {
        callback(movname)
    }

    useEffect(()=>{
        if (findmov){
            setmovname(findmov)
            callback(findmov)
        }
    },[])


    return (
        <div style={{position: 'absolute', right: '1vh' }}>
            <TextField id="outlined-basic" label="Find Movie's Name" variant="outlined" onChange={(e)=>setmovname(e.target.value)} defaultValue={findmov}/>
            <Button size="large" variant="contained" sx={{ backgroundColor: '#521482' }} onClick={handlefind}>Find</Button>
        </div>
    )
}

export default FindMoviesComp
