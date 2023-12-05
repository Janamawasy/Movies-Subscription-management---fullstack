import React, { useEffect } from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Stack from '@mui/material/Stack';


// in order to create account, the user should exist in userJS, if the username exist, then new user account created in userDB(username and id)
function CreatAccount() {

    const urlUsersdb = 'http://localhost:8001/usersdb';

    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')
    const [users,setusers] = useState([])
    const [NewAcount,setNewAcount] = useState(false)
    const [NoAcount,setNoAcount] = useState(false)
    const [isCanceled,setisCanceled] = useState(false) 

    const fetchdata = async() =>{
        const {data} = await axios.get(urlUsersdb)
        setusers(data)
    }

    useEffect(()=>{
        fetchdata()
    },[])

    const handleNewACC = async() => {
        const existuser = users.find((user)=>user.UserName === username)
        if(existuser.UserName && !existuser.Password){
            const obj={
                Password:password
            }
            const {data} = await axios.put(`${urlUsersdb}/${existuser._id}`,obj)
            if(data === 'Updated!'){
                setNewAcount(true)
            }else{
                console.log('Error in Updating exist user')
            }
        }else{
            setNoAcount(true)
        }
    }

    useEffect(() => {
        if (isCanceled) {
          window.location.href = '/'; // Redirect to log in page
        }
      }, [isCanceled]);


    return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#efe6f7'}}> 
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <h2>Create New Account</h2>
                <TextField id="outlined-basic" label="UserName" variant="outlined" onChange={(e)=>setusername(e.target.value)}/><br/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e)=>setpassword(e.target.value)}/>

            <br/><br/><br/>
            <Stack spacing={3} direction="row">
                <Button variant="contained" onClick={handleNewACC} sx={{ backgroundColor: '#521482' }}>Create</Button>
                <Button variant="contained" onClick={()=>setisCanceled(true)} sx={{ backgroundColor: '#521482' }}>Cancle</Button>
            </Stack>
            </Box>
            <br/><br/>
            {NewAcount && (
                    <h3 style={{fontFamily: "monospace"}}>Congrats New Acount Created!</h3>
                )}
            {NoAcount && (
                <h3 style={{fontFamily: "monospace"}}>UserName not Existing! </h3>
            )}
            </div>
    )
}

export default CreatAccount
