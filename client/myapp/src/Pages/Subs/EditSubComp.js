import React, { useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

function EditSubComp({member}) {
    const [name,setname] = useState(member.name)
    const [email,setemail] = useState(member.email)
    const [city,setcity] = useState(member.city)
    const [isedited,setisedited] = useState(false) //isCanceled
    const [isCanceled,setisCanceled] = useState(false) 
    const [displaypage , setdisplaypage] = useState(false)

    const perms = useSelector(state => state.perms);

    const Checkperms  = () =>{
      console.log('perms',perms)
      const aa = perms.find((perm)=>perm==="Update Subscriptions")
      console.log('aa',aa)
      if (aa){
        setdisplaypage(true)
      }
    }

    useEffect(()=>{
        Checkperms()
      },[])

    const urlMember = 'http://localhost:8001/members'

    const handleEdit = async() => {
        const obj = {
            name: name, 
            email: email,
            city: city
        }
        console.log('obj',obj)
        const {data} = await axios.put(`${urlMember}/${member._id}`,obj)
        console.log('data888',data)
        if (data === 'Updated!' ){
            setisedited(true)
        }else(
            console.log('error in updating user!')
        )
    }

    // useEffect(() => {
    //     if (isCanceled) {
    //       window.location.href = '/main/SubsPage'; // Redirect to "/main/UsersPage"
    //     }
    //   }, [isCanceled]);

    return (
        <div>
            {displaypage ? (
            <div>
                EditSubComp
                <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Name" variant="outlined" defaultValue={name} onChange={(e)=>setname(e.target.value)}/>
                    <TextField id="outlined-basic" label="City" variant="outlined" defaultValue={city} onChange={(e)=>setemail(e.target.value)}/><br/>
                    <TextField id="outlined-basic" label="Email" variant="outlined" defaultValue={email} onChange={(e)=>setcity(e.target.value)}/>
                </Box>
                <Stack spacing={3} direction="row">
                    <Button variant="contained" onClick={handleEdit} sx={{ backgroundColor: '#521482' }}>Edit</Button>
                    <NavLink to='/main' underline="none">
                        <Button variant="contained" sx={{ backgroundColor: '#521482' }}>Cancle</Button>
                    </NavLink>
                </Stack>
                <br/><br/>
                {isedited && (
                    <h4 style={{fontFamily: "cursive"}}>Member data has been edited successfully</h4>
                )}
            </div>
            ) : (
                <h2 style={{ fontFamily: "cursive" }}>No permission to enter this page</h2>
            )}
        </div>
    )
}

export default EditSubComp
