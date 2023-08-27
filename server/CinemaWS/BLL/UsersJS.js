
const firebase = require('../firebaseApp/firebase')
const { firestore } = require('../firebaseApp/firebase')

const getUsers =async  () => {
    // const firestore = firebase.firestore(); // Get the Firestore instance
    // const data = await firestore.collection('Users').get();
    const data = await firestore.collection('Users').get();
   const Usersdata = [];
   data.forEach(doc =>
    {
        Usersdata.push({
            id : doc.data().id,
            fname : doc.data().fname,
            lname : doc.data().lname,
            createdDate : doc.data().createdDate,
            sessionTimeOut : doc.data().sessionTimeOut,
            isadmin : doc.data().isadmin
        })
    })
    return Usersdata
 }
  

const getUserByID = async (id) => {
    try {
      const usersCollection = firestore.collection('Users');
      const querySnapshot = await usersCollection.where('id', '==', id).get();
  
      if (querySnapshot.empty) {
        // No user with the provided id found
        return null;
      }
  
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
  
      const user = {
        id: userData.id,
        fname: userData.fname,
        lname: userData.lname,
        createdDate: userData.createdDate,
        sessionTimeOut: userData.sessionTimeOut,
        isadmin : userData.isadmin
      };
  
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };
  

 const AddUser = async  (obj) => {
    const added = await firestore.collection('Users').add(obj)
    console.log("added user")  
    return "Created!"  
 }

 const updateUser = async (id,obj) => {
    try {
    const usersCollection = firestore.collection('Users');
    const querySnapshot = await usersCollection.where('id', '==', id).get();
    if (querySnapshot.empty) {
        // No user with the provided id found
        return null;
      }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
  
      const updatedUser = {
        id: obj.id || userData.id,
        fname: obj.fname || userData.fname,
        lname: obj.lname || userData.lname,
        createdDate: obj.createdDate || userData.createdDate,
        sessionTimeOut: obj.sessionTimeOut || userData.sessionTimeOut,
        isadmin: obj.isadmin || userData.isadmin
      };

      // Update the user data in the Firestore collection
    await userDoc.ref.update(updatedUser);
      return 'Updated!';
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
 }


 const deleteUser = async (id) =>{
        try {
          const querySnapshot = await firestore.collection('Users').where('id', '==', id).get();
          
          if (querySnapshot.empty) {
            // No user with the provided id found
            return "User not found!";
          }
          
          // Delete each document that matches the query
          const deletePromises = [];
          querySnapshot.forEach((doc) => {
            deletePromises.push(doc.ref.delete());
          });
      
          await Promise.all(deletePromises);
          return "Deleted!";
        } catch (error) {
          console.error('Error deleting user:', error);
          throw error;
        }
      };
        
 


 module.exports = { 
    getUsers, 
    getUserByID, 
    AddUser,
    updateUser,
    deleteUser,
};

 