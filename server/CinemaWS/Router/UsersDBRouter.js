const express = require('express');
const usersDBBLL = require('../BLL/UsersDBBLL');
const router = express.Router();

// 'http://localhost:8001/usersDB' is the Entry Point

// Get All users
router.route('/').get(async (req, res) => {
  try {
    const users = await usersDBBLL.getAllUsersDB();
    res.json(users); // 200 - OK
  } catch (error) {
    console.error(error)
    res.json('There was an error!');
    // res(error.body)
  }
});

// Get user by ID
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const users = await usersDBBLL.getUsersDBById(id);
  res.json(users);
});

// Add a new user
router.route('/').post(async (req, res) => {
  const obj = req.body;
  const result = await usersDBBLL.addUsersDB(obj);
  res.status(201).json(result);
});

// Update a user
router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await usersDBBLL.updateUsersDB(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json('There was an error!');
  }
});


// Delete a user
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await usersDBBLL.deleteUsersDB(id);
  res.json(result);
});

module.exports = router;