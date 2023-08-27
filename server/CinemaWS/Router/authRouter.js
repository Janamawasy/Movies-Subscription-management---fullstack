const express = require('express');
const jwt = require('jsonwebtoken');

const UsersDBBLL = require('../BLL/UsersDBBLL')
const UsersJSBLL = require('../BLL/UsersJS')

const router = express.Router();

// Entry Point: 'http://localhost:8001/auth

router.route('/').post(async (req, res) => {
  console.log('req.body',req.body)
  //req.body is the username and password that written in the Login page inputs as request
  const { username, password } = req.body;

  // if 'username' and 'password' are exist in users JS
  // userExists returns all the data in usersJS about the user
  // fitching user data by id from usersDB 
  const users = await UsersDBBLL.getAllUsersDB();
  console.log('users',users)
  const userExists = users.find((user)=>user.UserName === username && user.Password===password)
  console.log('userExists',userExists)

  if (userExists) {
    const userId = userExists._id // find user's ID
    const ACCESS_SECRET_TOKEN = 'someKey';
    console.log('userId',userId.toString())

    const userData = await UsersJSBLL.getUserByID(userId.toString())
    const accessToken = jwt.sign(
      { id: userId ,
      fname: userData.fname,
      lname: userData.lname,
      createdDate: userData.createdDate,
      sessionTimeOut: userData.sessionTimeOut,
      isadmin: userData.isadmin},
      ACCESS_SECRET_TOKEN
      // { expiresIn: 7200 } // expires after 7200s (2 hours)
    );
    res.json({ accessToken });
  }else{
    res.status(401).json('Wrong username or password!');; // Unauthorized

  }

});

module.exports = router;