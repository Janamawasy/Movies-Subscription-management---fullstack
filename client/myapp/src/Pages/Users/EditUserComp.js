import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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


function EditUserComp({user}) {
    console.log(user)
    const urlperm1 = 'http://localhost:8001/perms';
    const urluser2 = 'http://localhost:8001/users';
    const urluserdb3 = 'http://localhost:8001/usersDB';
    console.log(user)

    const dispatch = useDispatch();

    const [username,setusername] = useState(user.UserName)
    const [fname,setfname] = useState(user.setfname)
    const [lname,setlname] = useState(user.lname)
    const [sessionTimeOut,setsessionTimeOut] = useState(user.sessionTimeOut)
    const [isAdmin,setisAdmin] = useState(user.isadmin)
    const [isedited,setisedited] = useState(false) 
    const [isCanceled,setisCanceled] = useState(false) 


    const handlename = (e) => {
        const fullname = e.target.value.split(' ')
        setfname(fullname[0])
        setlname(fullname[1])
    }

    const perms = ['View Subscriptions','Create Subscriptions','Delete Subscriptions','Update Subscriptions','View Movies','Create Movies','Delete Movies','Update Movies']

    // MUI CODE
    const [checked, setChecked] = useState(user.permissions);

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

    const handleEdit = async () => {
        const obj1 = {
            id: user.id,
            permissions: checked
        }
        const obj2 = {
            id: user.id,
            fname: fname,
            lname: lname,
            sessionTimeOut: sessionTimeOut,
            isadmin: isAdmin
        }
        const obj3 = {
            UserName: username,
        }
        console.log('obj1',obj1)
        console.log('obj2',obj2)
        console.log('obj3',obj3)

        const {data : data1} = await axios.put(`${urlperm1}/${user.id}`,obj1)
        const {data : data2} = await axios.put(`${urluser2}/${user.id}`,obj2)
        const {data : data3} = await axios.put(`${urluserdb3}/${user.id}`,obj3)

        console.log('dd1',data1)
        console.log('dd2',data2)
        console.log('dd3',data3)

        if (data1 === 'Updated!' && data2 === 'Updated!' && data3 === 'Updated!' ){
            setisedited(true)
            dispatch({ type: 'UPDATEPERMS', payload: {id: user.id ,perms: checked }});

        }else(
            console.log('error in updating user!')
        )
        
    }

    // useEffect(() => {
    //     if (isCanceled) {
    //       window.location.href = '/main/UsersPage'; // Redirect to "/main/UsersPage"
    //     }
    //   }, [isCanceled]);

      

    return (
        <div>
           <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Full Name" variant="outlined" defaultValue={`${user.fname} ${user.lname}`} onChange={(e)=>handlename(e)}/>
                <TextField id="outlined-basic" label="UserName" variant="outlined" defaultValue={user.UserName} onChange={(e)=>setusername(e.target.value)}/><br/>
                <TextField id="outlined-basic" label="session Time Out [Min]" variant="outlined" type='Number' defaultValue={(user.sessionTimeOut/60).toFixed(0)} onChange={(e)=>setsessionTimeOut(e.target.value*60)}/>
                <TextField id="outlined-basic" disabled label="Created Date" variant="outlined" defaultValue={user.createdDate} />
                <FormControl component="fieldset" variant="standard">
                    <FormControlLabel control={<Switch checked={isAdmin} onChange={(e)=>setisAdmin(e.target.checked)}/>} label="Admin"/>
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
                <Button variant="contained" onClick={handleEdit} sx={{ backgroundColor: '#521482' }}>Edit</Button>
                <NavLink to='/main' underline="none">
                    <Button variant="contained" sx={{ backgroundColor: '#521482' }}>Cancle</Button>
                </NavLink>
            </Stack>
            <br/><br/>
            {isedited && (
                <h4 style={{fontFamily: "cursive"}}>user data has been edited successfully</h4>
            )}

          
        </div>
    )
}

export default EditUserComp
