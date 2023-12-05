import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import { NavLink } from 'react-router-dom';


function AddUserComp() {
    const urlUsers = 'http://localhost:8001/users';
    const urlUsersDB = 'http://localhost:8001/usersDB';
    const urlPerms = 'http://localhost:8001/perms';

    const [username,setusername] = useState('')
    const [fname,setfname] = useState('')
    const [lname,setlname] = useState('')
    const [sessionTimeOut,setsessionTimeOut] = useState('')
    const [createdDate,setcreatedDate] = useState(new Date().toLocaleDateString('en-GB'))
    const [isAdmin,setisAdmin] = useState(false)
    const [Info, setInfo] = useState('')

    const handlename = (e) => {
        const fullname = e.target.value.split(' ')
        setfname(fullname[0])
        setlname(fullname[1])
    }

    const perms = ['View Subscriptions','Create Subscriptions','Delete Subscriptions','Update Subscriptions','View Movies','Create Movies','Delete Movies','Update Movies']

    // MUI CODE
    const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const newChecked = [...checked];

    if (newChecked.includes(value)) {
        // If the value exists in the array, remove it
        setChecked(newChecked.filter((item) => item !== value));
      } else {
        // If the value doesn't exist, add perm
        // if perm to add is Create or Delete or Update :: => make sure view perm exist, if no add it as well
        if (value === 'Create Subscriptions' ||
            value === 'Delete Subscriptions' ||
            value === 'Update Subscriptions'){
                if (!newChecked.includes('View Subscriptions')){
                    setChecked([...newChecked, value,'View Subscriptions']);
                }else{
                    setChecked([...newChecked, value]);
                }
        }
        else if (value === 'Create Movies' ||
                value === 'Delete Movies' ||
                value === 'Update Movies'){
                    if (!newChecked.includes('View Movies')){
                        setChecked([...newChecked, value,'View Movies']);
                    }else{
                        setChecked([...newChecked, value]);
                    }
                }else{
                setChecked([...newChecked, value]);}}
    };

    const handleSave = async() => {
        const obj1 = {
            UserName: username,
        }
        await axios.post(`${urlUsersDB}`,obj1)
        const {data : usersdbdata} = await axios.get(`${urlUsersDB}`)
        const userid = usersdbdata.find((user)=> user.UserName === username)._id

        const obj2 = {
            userid: userid,
            fname: fname,
            lname: lname,
            sessionTimeOut: sessionTimeOut,
            createDate : createdDate,
            isadmin: isAdmin
        }
        const obj3 = {
            userid: userid,
            permissions: checked
        }

        if (username && sessionTimeOut && fname && checked.length >= 1){
            const {data:usersdata} = await axios.post(`${urlUsers}`,obj2)
            console.log(usersdata)
            const {data:permsdata} = await axios.post(`${urlPerms}`,obj3)
            console.log(permsdata)
            if (permsdata && usersdata){
                // setIsSaved(true)
                setInfo('user has been Added successfully')
            }else{
                setInfo('Error in Creating new User')                
            }
        }else{
            setInfo('Missing Information, make sure of entering username, session Time Out, full name and at least one checked permetion!')
        }
    }

    const handleSwitchChange = (event) => {
        setisAdmin(event.target.checked);
      };

    return (
     <div>
        {/* <h2 style={{fontFamily: "monospace"}}> Add User :</h2> */}
        <br/>
        <h3 style={{fontFamily: "monospace"}}>{Info}</h3>
        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Full Name" variant="outlined" onChange={(e)=>handlename(e)}/>
                <TextField id="outlined-basic" label="UserName" variant="outlined" onChange={(e)=>setusername(e.target.value)}/><br/>
                <TextField id="outlined-basic" label="session Time Out [Min]" variant="outlined" type='Number' onChange={(e)=>setsessionTimeOut(e.target.value*60)}/>
                <TextField id="outlined-basic" disabled label="Created Date" defaultValue={createdDate} variant="outlined" />
                <FormControl component="fieldset" variant="standard">
                    <FormControlLabel control={<Switch checked={isAdmin} onChange={handleSwitchChange} />} label="Admin"/>
                </FormControl>
        </Box>    

        {/* // perms checkbox:: */}
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {perms.map((value) => {
                        return (
                        <ListItem key={value} disablePadding>
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                onChange={handleToggle(value)}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': value }}
                                />
                            <ListItemText  primary={value} />
                            </ListItemButton>
                        </ListItem>
                        );
                    })}
                    </List>

            <Stack spacing={3} direction="row">
                <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: '#521482' }}>Save</Button>
                <NavLink to='/main' underline="none">
                    <Button variant="contained" sx={{ backgroundColor: '#521482' }}>Cancle</Button>
                </NavLink>
            </Stack>
            
     </div>   
    )
}

export default AddUserComp
