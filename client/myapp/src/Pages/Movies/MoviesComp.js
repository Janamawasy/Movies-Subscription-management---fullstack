import React, { useEffect } from 'react'
import AddMovieComp from './AddMovieComp'
import AllMoviesComp from './AllMoviesComp'
import {useState} from 'react'
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function MoviesComp() {

    const [action, setaction] = useState('AllUsers');
    const [displaypage , setdisplaypage] = useState(false)
    const [displayAdd , setdisplayAdd] = useState(false)

    const perms = useSelector(state => state.perms);

    const Checkperms  = () =>{
      const aa = perms.find((perm)=>perm==="View Movies")
      const anableadd = perms.find((perm)=>perm==="Create Movies")
      if (aa){
        setdisplaypage(true)
      }
      if (anableadd){
        setdisplayAdd(true)
      }
    }

    useEffect(()=>{
      Checkperms()
    },[])

    const handleChange = (event) => {
      setaction(event.target.value);
    };

    return (
      <div>
  {displaypage ? (
      <div>
        MoviesComp
        <br /><br /><br />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={action}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value='AllUsers'>All Movies</MenuItem>
            <MenuItem value='AddUser'>New Movie</MenuItem>
          </Select>
        </FormControl>
        {action === 'AllUsers' ? (
          <AllMoviesComp />
        ) : (displayAdd ? (
          <AddMovieComp />          
        ):(
          <h2 style={{ fontFamily: "cursive" }}> No permission to enter this page </h2>
        )
        )}
      </div>
  ) : (
    <h2 style={{ fontFamily: "cursive" }}>No permission to enter this page</h2>
  )}
</div>

    )
  }

export default MoviesComp
