const initialValue = {
    perms: [],
    userId : '',
    userstatus : false,
  };
  // perms :  is array of user permissions
  // userId : the id of the user that logged in
  // userstatus : true = admin, false = not admin
  
  const ApplyChange = (state = initialValue, action) => {
    switch (action.type) {
      case 'SETPERMS':
        console.log('action.payload',action.payload)
        // return { ...state, perms : action.payload };
        const newState = { ...state, perms: action.payload.perms , userId :action.payload.id};
        console.log('newState', newState); // Log the updated state
        return newState;

      case 'UPDATEPERMS':
        console.log('in update dispatch')
        if (state.userId === action.payload.id){
            const updatedState = { ...state, perms: action.payload.perms}
            console.log('updatedState',updatedState)
            return updatedState;
        }

       case 'SETUSERSTATUS':
        const newState1 = { ...state, userstatus: action.payload.userstatus };
        console.log('newState1', newState1); // Log the updated state
        return newState1;

    
      default:
        return state;
    }
  };
  
  export default ApplyChange;

  