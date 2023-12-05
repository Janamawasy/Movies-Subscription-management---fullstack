import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

function MemberSubs({memId}) {
    const urlSubs = 'http://localhost:8001/subs';
    const urlMovies = 'http://localhost:8001/movies';

    const [subs,setsubs] = useState([])
    const [movies,setmovies] = useState([])
    const [action, setaction] = useState('');
    const [dropdown,setdropdown] = useState(false)
    const [moviestowatch,setmoviestowatch] = useState([])
    const [date,setdate] = useState('')
    const [allreadywatched,setallreadywatched] = useState([])
    const [isAdded,setisAdded] = useState(false)

    const fetchdata = async () => {
        const { data } = await axios.get(urlSubs);
        setsubs(data)
        const { data:data2 } = await axios.get(urlMovies);
        setmovies(data2)
    };

    useEffect(()=>{
        fetchdata();
    },[])

    const memSubs = subs.find((sub)=> sub.MemberId === memId)

    const getmoviename = (movid) => {
        const movie = movies.find((mov)=> mov._id === movid)
        return movie?.name
    }

    const handleChange = (event) => {
        setaction(event.target.value);
      };


    const handleNewSub = () => {
            if (memSubs && memSubs.Movies && memSubs.Movies.length > 0) {
                setallreadywatched(memSubs.Movies);
            }else{
                setmoviestowatch(movies)
                console.log('no subs',movies)
                setdropdown(true) 
            }
      };
      
      useEffect(() => {
        if (allreadywatched.length > 0) {
          const moviestowatch1 = movies.filter((mov) => {
            return !allreadywatched.some((watched) => watched.movieId === mov._id);
          });
          setmoviestowatch(moviestowatch1);
          setdropdown(true);
        }
      }, [allreadywatched]);

      const handleSave = async() => {
        // if subs is empty => create (post) new subs else put (update) by memberId
            if (allreadywatched.length === 0){
                const obj1 = {
                    MemberId: memId,
                    Movies: {
                        movieId: action,
                        date: date
                    }}
                // create
                const {data} = await axios.post(urlSubs,obj1)
                console.log(data)
                if (data === 'Created!'){
                    // window.location.href = '/main/SubsPage'
                    setisAdded(true)
                }
            }else{
                const memsubs = subs.find((sub)=>sub.MemberId===memId);
                const obj2 = {
                    MemberId: memId,
                    Movies: [...memsubs.Movies,
                        {movieId: action,
                         date: date}]}
                // update
                const {data} = await axios.put(`${urlSubs}/${memsubs._id}`,obj2)
                console.log(data)
                if (data === 'Updated!'){
                    // window.location.href = '/main/SubsPage'
                    setisAdded(true)
                }
            }
        }

    return (
        <div>
            {memSubs && (
                <CardContent>
                {memSubs.Movies.map((mov,index)=>
                    <Typography gutterBottom variant="body1" component="div" key={index}>
                        <Link to="/main/MoviesPage" state={{ movieName: getmoviename(mov.movieId)}}>
                         - {getmoviename(mov.movieId)}  {mov.date}
                         </Link>
                    </Typography>
                    )}
                </CardContent>
                )}
                <CardActionArea sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained" onClick={()=>handleNewSub()} sx={{ backgroundColor: '#521482' }}>Subscribe to new Movie</Button>
                <br/><br/>
                {isAdded && (
                    <h3 style={{fontFamily: "monospace"}}>Movie has been Subscribe successfully</h3>
                )}
                {dropdown && moviestowatch && (<>
            <Stack spacing={3} direction="row">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={action}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {/* <MenuItem value=""></MenuItem> */}
                    {moviestowatch.map((mov) => (
                    <MenuItem value={mov._id} key={mov._id}>
                        {mov.name}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
                <Box>
                <TextField id="outlined-basic" label="Watching Date" variant="outlined" type='Date' onChange={(e)=>setdate(e.target.value)} />
                </Box>
                <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: '#521482' }}>Subscribe</Button>
                </Stack>
                <br/>
                </>
                )}
                 

                </CardActionArea>    


        </div>
    )
}

export default MemberSubs
