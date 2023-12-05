import React from 'react'
import AddSubsComp from './AddSubsComp'
import AllSubsComp from './AllSubsComp'
import {useState , useEffect} from 'react'
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SubsComp() {
    const [action, setaction] = useState('AllSubs');
    const [displaypage , setdisplaypage] = useState(false)
    const [displayAdd , setdisplayAdd] = useState(false)

    const perms = useSelector(state => state.perms);
    console.log('perms', perms)
    
    const Checkperms  = () =>{
      const aa = perms.find((perm)=>perm==="View Subscriptions")
      const anableadd = perms.find((perm)=>perm==="Create Subscriptions")
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
            <br/><br/><br/>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={action}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value='AllSubs'>All Subscription</MenuItem>
          <MenuItem value='AddSub'>New Subscription</MenuItem>
        </Select>
      </FormControl>

      {action === 'AllSubs'?(
        <AllSubsComp/>
      ):(displayAdd ? (
        <AddSubsComp/>
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

export default SubsComp
