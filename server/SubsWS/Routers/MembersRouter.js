const express = require('express');
const MembersBLL = require('../BLL/MembersBLL');

const router = express.Router();

// 'http://localhost:8001/members' is the Entry Point

// Get All members
router.route('/').get(async (req, res) => {
  try {
    // Populate members data
    await MembersBLL.PopulateMembers();

    const members = await MembersBLL.getAllMembers();
    res.json(members); // 200 - OK
  } catch (error) {
    console.error(error)
    res.json('There was an error!');
  }
});

// Get subsecriber by ID
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const Subs = await MembersBLL.getMemberById(id);
    res.json(Subs);
  });

// Add a new subsecriber
router.route('/').post(async (req, res) => {
    const obj = req.body;
    const result = await MembersBLL.addMember(obj);
    res.status(201).json(result);
  });
  
  // Update a subsecriber
  router.route('/:id').put(async (req, res) => {
    try {
      const { id } = req.params;
      const obj = req.body;
      const result = await MembersBLL.updateMember(id, obj);
      res.json(result);
    } catch (error) {
      res.status(500).json('There was an error!');
    }
  });
  
  // Delete a subsecriber
  router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const result = await MembersBLL.deleteMember(id);
    res.json(result);
  });


module.exports = router;

