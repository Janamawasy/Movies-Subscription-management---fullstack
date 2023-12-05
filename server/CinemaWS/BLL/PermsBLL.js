// // Users in firebase - it worked only for month, so i storaged the data in mongoodb instead

// const firebase = require('../firebaseApp/firebase')
// const { firestore } = require('../firebaseApp/firebase')

// const getPerms =async  () => {
//     const data = await firestore.collection('Permissions').get();
//    const permsdata = [];
//    data.forEach(doc =>
//     {
//         permsdata.push({
//             id : doc.data().id,
//             permissions : doc.data().permissions   
//         })
//     })
//     return permsdata
//  }
  

// const getPermsByID = async (id) => {
//     try {
//       const permsCollection = firestore.collection('Permissions');
//       const querySnapshot = await permsCollection.where('id', '==', id).get();
  
//       if (querySnapshot.empty) {
//         // No user with the provided id found
//         return null;
//       }
  
//       const userDoc = querySnapshot.docs[0];
//       const userData = userDoc.data();
  
//       const user = {
//         id: userData.id,
//         permissions : userData.permissions   
//       };
  
//       return user;
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       throw error;
//     }
//   };
  

//  const AddPerm = async  (obj) => {
//     const added = await firestore.collection('Permissions').add(obj)
//     console.log("added user")  
//     return "Created!"  
//  }

//  const updatePerms = async (id,obj) => {
//     try {
//     const permsCollection = firestore.collection('Permissions');
//     const querySnapshot = await permsCollection.where('id', '==', id).get();
//     if (querySnapshot.empty) {
//         // No user with the provided id found
//         return null;
//       }
//     const userDoc = querySnapshot.docs[0];
//     const userData = userDoc.data();
  
//       const updatedUser = {
//         id: obj.id || userData.id,
//         permissions: obj.permissions || userData.permissions,
//       };

//       // Update the user data in the Firestore collection
//     await userDoc.ref.update(updatedUser);
//       return 'Updated!';
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         throw error;
//       }
//  }


//  const deletePerm = async (id) =>{
//         try {
//           const querySnapshot = await firestore.collection('Permissions').where('id', '==', id).get();
          
//           if (querySnapshot.empty) {
//             // No user with the provided id found
//             return "User not found!";
//           }
          
//           // Delete each document that matches the query
//           const deletePromises = [];
//           querySnapshot.forEach((doc) => {
//             deletePromises.push(doc.ref.delete());
//           });
      
//           await Promise.all(deletePromises);
//           return "Deleted!";
//         } catch (error) {
//           console.error('Error deleting user:', error);
//           throw error;
//         }
//       };
        
// //  add permission to permissions !!!


//  module.exports = { 
//     getPerms, 
//     getPermsByID, 
//     AddPerm,
//     updatePerms,
//     deletePerm,
// };


const Perms = require('../Models/permsModel');

// GET - Get All - Read
const getPerms = () => {
  return Perms.find({});
};

// GET - Get By ID - Read
const getPermsById = (id) => {
  return Perms.findById({ _id: id });
};

// Post - Create a new Perms - Create
const addPerm = async (obj) => {
  const per = new Perms(obj);
  await per.save();
  return 'Created!';
};

// PUT - Update a Perms - Update
const updatePerms = async (id, obj) => {
  await Perms.findByIdAndUpdate(id, obj);
  return 'Updated!';
};


// DELETE - Delete a Perms - Delete
const deletePerms = async (id) => {
  await Perms.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getPerms,
  getPermsById,
  addPerm,
  deletePerms,
  updatePerms
};