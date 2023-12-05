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
    };

    const prepareData = async (users) => {
        const { data: usersDB } = await axios.get(urlUsersDB);
        const { data: perms } = await axios.get(urlPerms);
      
        const preparedUsersData = users.map((user) => {
          const userDB = usersDB.find((userd) => userd._id === user.userid);
          const userperms = perms.find((userd) => userd.userid === user.userid);
      
          if (userDB && userperms) {
            const obj = {
              id: userDB._id,
              UserName: userDB.UserName,
              fname: user.fname,
              lname: user.lname,
              sessionTimeOut: user.sessionTimeOut,
              isadmin: user.isadmin,
              createdDate: user.createDate,
              permissions: userperms.permissions,
            };
            return obj;
          }
          return null;
        });
      
        const filteredUsersData = preparedUsersData.filter((user) => user !== null);
        console.log('filteredUsersData', filteredUsersData)
        setusersdata(filteredUsersData);
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
        console.log('userid', userid)
        // userid is _id in usersdburl, amd userid in BOTH permsurl and userurl
        const {data : data1} = await axios.delete(`${urlUsersDB}/${userid}`)

        const {data : permsdata} = await axios.get(urlPerms)
        const userperms = permsdata.find((userperms)=> userperms.userid === userid)
        const {data : data2} = await axios.delete(`${urlPerms}/${userperms?._id}`)

        const {data : usersdata} = await axios.get(urlUsers)
        const userdata = usersdata.find((user)=> user.userid === userid)
        const {data : data3} = await axios.delete(`${urlUsers}/${userdata?._id}`)


        if (data1 === "Deleted!" && data2 === "Deleted!" && data3 === "Deleted!" ){
            console.log('Deleted Succesfully!') 
            setIsDeleted(true)
        }
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
            <Card key={user._id} sx={{ maxWidth: 400 , backgroundColor:'#eae3fc' , color:'#463675' }}>
            <CardActionArea>
                <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    Name: {user.fname} {user.lname}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    UserName: {user.UserName}  
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    session Time Out: {user.sessionTimeOut/60}  [min]
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
