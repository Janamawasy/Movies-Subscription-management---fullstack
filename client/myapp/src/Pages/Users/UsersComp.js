import {useState} from 'react'
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AllUsersComp from './AllUsersComp';
import AddUserComp from './AddUserComp';

function UsersComp() {

  const [action, setaction] = useState('AllUsers');

  const handleChange = (event) => {
    setaction(event.target.value);
  };


    return (
        <div >
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
          <MenuItem value='AllUsers'>All Users</MenuItem>
          <MenuItem value='AddUser'>New User</MenuItem>
        </Select>
      </FormControl>

      {action === 'AllUsers'?(
        <AllUsersComp/>
      ):(
        <AddUserComp/>
      )}

        </div>
    )
}

export default UsersComp
