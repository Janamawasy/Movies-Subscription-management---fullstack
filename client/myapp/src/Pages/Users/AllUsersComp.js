import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import EditUserComp from './EditUserComp';
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

function AllUsersComp() {
    const urlUsers = 'http://localhost:8001/users';
    const urlUsersDB = 'http://localhost:8001/usersDB';
    const urlPerms = 'http://localhost:8001/perms';

    const [users,setusers] = useState([])
    const [usersdata,setusersdata] = useState([])
    const [toEdit,settoEdit] = useState(false); 
    const [UsertoEdit,setUsertoEdit] = useState([]); 
    const [IsDeleted,setIsDeleted] = useState(false)


    const fetchUsersDB = async () => {
        const { data } = await axios.get(urlUsers);
        setusers(data)
        prepareData(data)
        console.log(users)
    };

    const prepareData = async (users) => {
        console.log('users', users);
        const { data: usersDB } = await axios.get(urlUsersDB);
        const { data: perms } = await axios.get(urlPerms);
        console.log('usersDB', usersDB);
        console.log('perms', perms);
      
        const preparedUsersData = users.map((user) => {
          const userDB = usersDB.find((userd) => userd._id === user.id);
          const userperms = perms.find((userd) => userd.id === user.id);
          console.log('userDB111', userDB);
          console.log('userperms111', userperms);
      
          if (userDB && userperms) {
            console.log('in if !!!');
            const obj = {
              id: userDB._id,
              UserName: userDB.UserName,
              fname: user.fname,
              lname: user.lname,
              sessionTimeOut: user.sessionTimeOut,
              isadmin: user.isadmin,
              createdDate: user.createdDate,
              permissions: userperms.permissions,
            };
            return obj;
          }
          return null;
        });
      
        const filteredUsersData = preparedUsersData.filter((user) => user !== null);
      
        setusersdata(filteredUsersData);
        console.log('')
        return filteredUsersData;
      };
      

    useEffect(()=>{
        fetchUsersDB();
    },[])

    const handleEdit = (e) => {
        settoEdit(true)
        setUsertoEdit(e)
    }

    const handleDelete = async(userid) => {
        await axios.delete(`${urlPerms}/${userid}`)
        await axios.delete(`${urlUsers}/${userid}`)
        await axios.delete(`${urlUsersDB}/${userid}`)
        console.log('Deleted Succesfully!') 
        setIsDeleted(true)
    }

    return (
        <div >
            <br/><br/><br/>
            <br/><br/>
                {IsDeleted && (
                    <h4 style={{fontFamily: "cursive"}}>user has been Deleted successfully</h4>
                )}
            {/* /// if the edit button is clicked, go to edit user page if not get all users cards */}
            {!toEdit ? (
                <Grid container spacing={2}>
                    {usersdata.map((user) => (
                    <Grid item key={user.id} xs={12} md={6}>
                {/* usersdata.map((user)=> */}
            <Card key={user.id} sx={{ maxWidth: 400 , backgroundColor:'#eae3fc' , color:'#463675' }}>
            <CardActionArea>
                <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    Name: {user.fname} {user.lname}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    UserName: {user.UserName}  
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    session Time Out: {user.sessionTimeOut}  
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    created Date: {user.createdDate}  
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    permissions: {user.permissions.map(((perm,index)=> <li key={index}>{perm}</li>))}  
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <NavLink to="EditUser" underline="none">
                    <Button size="small" color="primary" onClick={() => handleEdit(user)}>
                    Edit
                    </Button>
                </NavLink>
                <Button size="small" color="primary" onClick={() => handleDelete(user.id)}>
                Delete
                </Button>
            </CardActions>
            </Card>
            </Grid>
        ))}
      </Grid>
    ) : (
      <EditUserComp user={UsertoEdit} />
    )}
  </div>
    )
}

export default AllUsersComp
