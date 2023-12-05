import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

function AddSubsComp() {

    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [city,setcity] = useState('')
    const [IsSaved,setIsSaved] = useState(false) 

    const urlMember = 'http://localhost:8001/members'

    const handleSave = async () => {
        const obj = {
            name: name,
            email: email,
            city : city}

        console.log('obj',obj)
        if (name && email && city){
            const {data:movdata} = await axios.post(`${urlMember}`,obj)
            console.log(movdata)
            if (movdata === "Created!"){
                setIsSaved(true)
        }
        }
        
    } 


    return (
        <div>
            {IsSaved && (
                    <h3 style={{fontFamily: "monospace"}}>user has been Added successfully</h3>
                )}
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <TextField id="outlined-basic" required label="Name" variant="outlined" onChange={(e)=>setname(e.target.value)}/>
                <TextField id="outlined-basic" required label="City" variant="outlined" onChange={(e)=>setemail(e.target.value)}/><br/>
                <TextField id="outlined-basic" required label="Email" variant="outlined" onChange={(e)=>setcity(e.target.value)}/>
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

export default AddSubsComp
