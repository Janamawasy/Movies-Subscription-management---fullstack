import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Typography from '@mui/material/Typography';


function SubsWatchedComp({movId}) {
    const urlSubs = 'http://localhost:8001/subs'
    const urlMember = 'http://localhost:8001/members'

    const [Subs,setSubs] = useState([])
    const [Members,setMembers] = useState([])
    const [memsData,setmemsData] = useState([])
    const [display,setdisplay] = useState(false)

    const fetchdata = async() => {
        const {data: data1} = await axios.get(urlSubs)
        setSubs(data1)
        const {data : data2} = await axios.get(urlMember)
        setMembers(data2)
    }

    useEffect(()=>{
        fetchdata()
    },[])

    useEffect(() => {
        findSubsids(); // Call findSubsids after Subs is updated
      }, [Subs]);
    
    const findSubsids = () => {
        const SubsMovie = Subs.filter((Sub) => {
            return Sub.Movies.some((movie) => movie.movieId === movId);
          });
        if (SubsMovie.length>0){
            // const memsID = SubsMovie.map((Sub) => {Movies : Sub.Movies, MemberId: Sub.MemberId});  // Get the array of Movies from filtered Subs
        const memsID = SubsMovie?.map((Sub) => ({
            Movies: Sub.Movies.filter((mov)=>mov.movieId === movId),
            MemberId: Sub.MemberId
        }));
        setmemsData(memsID);
        setdisplay(true)
        }
    }

    const GetMemName = (memid) => {
        const member = Members.find((mem)=>mem._id === memid)
        return member?.name
    }


    return (
        <Typography>
    {display && (
        <div>
            Subscriptions watched the Movie:
            {memsData.map((mem) => (
                <div key={mem.MemberId}>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        - {GetMemName(mem.MemberId)}  {mem.Movies[0].date}
                    </Typography>
                </div>
            ))}
        </div>
    )}
        </Typography>

            )
}

export default SubsWatchedComp
