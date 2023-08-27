const express = require('express');
const SubBLL = require('../BLL/SubBLL');

const router = express.Router();

// 'http://localhost:8001/Subs' is the Entry Point

// Get All Subs
router.route('/').get(async (req, res) => {
  try {
    const Subs = await SubBLL.getAllSubs();
    res.json(Subs); // 200 - OK
  } catch (error) {
    console.error(error)
    res.json('There was an error!');
    // res(error.body)
  }
});

// Get subsecriber by ID
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const Subs = await SubBLL.getSubsById(id);
  res.json(Subs);
});

// Add a new subsecriber
router.route('/').post(async (req, res) => {
  const obj = req.body;
  const result = await SubBLL.addSubs(obj);
  res.status(201).json(result);
});

// Update a subsecriber
router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await SubBLL.updateSubs(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json('There was an error!');
  }
});

// Delete a subsecriber
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await SubBLL.deleteSubs(id);
  res.json(result);
});

module.exports = router;