import {React, useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MemberSubs from './MemberSubs';
import EditSubComp from './EditSubComp';

function AllSubsComp() {
    const urlMembers = 'http://localhost:8001/members';
    const urlSubs = 'http://localhost:8001/subs';

    const [members,setmembers] = useState([])
    const [subs,setsubs] = useState([])
    const [IsDeleted,setIsDeleted] = useState(false)
    const [toEdit,settoEdit] = useState(false); 
    const [MembertoEdit,setMembertoEdit] = useState([]); 
    const [displaypage , setdisplaypage] = useState(false)

    const perms = useSelector(state => state.perms);

    const Checkperms  = () =>{
      const aa = perms?.find((perm)=>perm==="Delete Subscriptions")
      if (aa){
        setdisplaypage(true)
      }
    }

    useEffect(()=>{
        Checkperms()
      },[])


    const fetchMembers = async () => {
        const { data } = await axios.get(urlMembers);
        setmembers(data)
        const { data:data1 } = await axios.get(urlSubs);
        setsubs(data1)
        console.log(data)
    };

    
      useEffect(()=>{
        fetchMembers();
    },[])

    const handleEdit = (e) => {
        settoEdit(true)
        setMembertoEdit(e)
    }

    const handleDelete = async(memId) => {
        const {data : data1} = await axios.delete(`${urlMembers}/${memId}`);
        const subID = subs.find((sub)=> sub.MemberId === memId)?._id
        if (subID){
            const {data: data2} = await axios.delete(`${urlSubs}/${subID}`);
        }
        if (data1 === 'Deleted!'){
            setIsDeleted(true)
        }
    }

    return (
        <div>
            {IsDeleted && (
                    <h4 style={{fontFamily: "cursive"}}>Member has been Deleted successfully</h4>
                )}
            {/* /// if the edit button is clicked, go to edit user page if not get all users cards */}
            {!toEdit ? (
                <Grid container spacing={2}>
                    {members.map((mem) => (
                    <Grid item key={mem.id} xs={12} md={6}>
            <Card key={mem._id} sx={{ maxWidth: 550 , backgroundColor:'#eae3fc' , color:'#463675' }}>
            <CardActionArea>
                <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    Name: {mem.name} 
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    Email: {mem.email}  
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    City: {mem.city}  
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <NavLink to="EditSub" underline="none">
                    <Button size="small" color="primary" onClick={() => handleEdit(mem)}>
                    Edit
                    </Button>
                </NavLink>
                {displaypage ? (
                <Button size="small" color="primary" onClick={() => handleDelete(mem._id)}>
                    Delete
                </Button>
                ):(null)}
            </CardActions>
            <CardActionArea>
                <MemberSubs memId={mem._id}/>
            </CardActionArea>
            </Card>
            </Grid>
        ))}
      </Grid>
    ) : (
      <EditSubComp member={MembertoEdit} />
    )}
        </div>
    )
}

export default AllSubsComp
