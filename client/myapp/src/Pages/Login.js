import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import jwt_decode from 'jwt-decode'

function Login() {
    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')
    const [isLoggedIn,setisLoggedIn] = useState(false)
    const [isFailed,setisFailed] = useState(false)
    const [userdata,setuserdata] = useState([]); 


    const handlelogin = async () => {
        try {
            const response = await fetch('http://localhost:8001/auth', {
              method:'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
              const data = await response.json();
              localStorage.setItem('accessToken', data.accessToken);
          // Redirect to main after authenticate the logging in
              setisLoggedIn(true)
  
          // decode user data from accesstoken in localstorage => getting user full name
              const accessToken = localStorage.getItem('accessToken');
              if (accessToken) {
                const decodedToken = jwt_decode(accessToken);
                console.log('decodedToken',decodedToken)
                setuserdata(decodedToken);
              }
  
              console.log('Login successful');
            } else {
                setisFailed(true)
              console.log('Login failed');
            }
          } catch (error) {
            console.error('Error occurred during login:', error);
          }

    }

    // redirect to create account page
    const handleCreateACC = () => {
        window.location.href = '/creataccount'
    }

    return (
        <div style={{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'}}> 

            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="UserName" variant="outlined" onChange={(e)=>setusername(e.target.value)}/><br/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e)=>setpassword(e.target.value)}/>

            <br/><br/><br/>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handlelogin}>Login</Button>
                <Button variant="text" onClick={handleCreateACC}>Create Account</Button>
            </Stack>
            <br/><br/>
            {isFailed && (
          <h4 style={{fontFamily: "cursive"}}>Wrong username or password, try again!</h4>
        )}
            </Box>

            {isLoggedIn && (
          <Navigate to="/main" state={{ userdata }}/>
        )}
            
        </div>
    )
}

export default Login
