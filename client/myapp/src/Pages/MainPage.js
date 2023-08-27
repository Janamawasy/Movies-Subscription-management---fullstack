import React, { useState , useEffect} from 'react'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import axios from 'axios'; 
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import TheatersIcon from '@mui/icons-material/Theaters';
import Button from '@mui/material/Button';
import { NavLink, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';

function MainPage() {
  
    const location = useLocation();
    const dispatch = useDispatch();


    const [isAdmin,setisAdmin] = useState(true);
    const [userdata,setuserdata] = useState([]); 
    const [userperms,setuserperms] = useState([]); 

    const urlperms = 'http://localhost:8001/perms';

    useEffect(() => {
      if (location.state) {
        setuserdata(location.state.userdata);
        console.log('location.state', location.state.userdata);
        setperms(location.state.userdata.id)
        setisAdmin(location.state.userdata.isadmin)
        setuserstatus(location.state.userdata.isadmin)
      }
    }, [location.state]);

/// set user initial permissions in redux
    const setperms = async(id) =>{
      console.log('userdata.id',id)
      const {data} = await axios.get(`${urlperms}/${id}`)
      console.log('data',data)
      if(data){
        setuserperms(data.permissions)
        dispatch({ type: 'SETPERMS', payload: {id: data.id ,perms: data.permissions }});
      }
    }

/// set user status isadmin: true or false in redux
    const setuserstatus = (isadmin) => {
      dispatch({ type: 'SETPERMS', payload: {userstatus: isadmin }});
    }

    // session time out feature: when user exeed the sessiontimeout, the web will log out
    if (location.state) {
      const sessionDuration = location.state.userdata.sessionTimeOut * 1000 ; // [sessionTimeOut] in secondes to milliseconds
      let loginTime = new Date();

      // Function to check remaining time and logout if timeout is exceeded
      const checkSessionTimeout = () => {
        const currentTime = new Date();
        const elapsedTime = currentTime - loginTime;

        if (sessionDuration <= elapsedTime) {
          // Perform logout action (e.g., dispatch a Redux action to log out the user)
          console.log('Session timeout exceeded. Logging out...');
          // Performing logout action 
          window.location.href = '/'
        }
      };
          // Check session timeout every second 
          const checkInterval = setInterval(checkSessionTimeout, 1000);
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor:  '#c9e2f5' ,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));


    return (
        <div>
            <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography 
            variant="h6"
            noWrap
            component="a"
            href="/main"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CNMA MANAGMNT
          </Typography>
          <Stack direction="row" spacing={15}>
          <NavLink to='MoviesPage' underline="none">
                    <Button variant="text"  sx={{ color : '#f2f5f7'}} startIcon={<TheatersIcon sx={{  color: '#b799cf' }}/>}>
                        Movies
                    </Button>
            </NavLink>
            <NavLink to='SubsPage' underline="none">
                    <Button variant="text"  sx={{ color : '#f2f5f7'}} startIcon={<SubscriptionsIcon sx={{color: '#b799cf' }}/>}>
                        Subscriptions   
                    </Button>
            </NavLink>
        {isAdmin && 
            <NavLink to='UsersPage' underline="none">
                <Button variant="text" sx={{ color : '#f2f5f7'}} startIcon={<PeopleAltIcon sx={{ color: '#b799cf' }}/>}  >
                    Users Managment
                </Button>
            </NavLink>
        }
        </Stack>
            <Button variant="contained" href="/" sx={{ backgroundColor: '#521482' , position: 'absolute', right: '1vh'}}>Logout</Button>
          </Toolbar>
      </Container>
    </AppBar>

    {/* the outlet in contained saperated from the app bar to dispaly the components in the page it self not in the app bar */}
    <Container maxWidth="xl" sx={{ paddingTop: '2rem' }}>
                <Outlet />
    </Container>

        </div>
    )
}

export default MainPage
