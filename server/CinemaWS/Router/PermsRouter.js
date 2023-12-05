const express = require('express');
const PermsBLL = require('../BLL/PermsBLL');

const router = express.Router();

// 'http://localhost:8001/perms' is the Entry Point

// Get All members
router.route('/').get(async (req, res) => {
  try {
    const members = await PermsBLL.getPerms();
    res.json(members); // 200 - OK
  } catch (error) {
    console.error(error)
    res.json('There was an error!');
  }
});

// Get subsecriber by ID
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const Subs = await PermsBLL.getPermsById(id);
    res.json(Subs);
  });



// Add a new subsecriber
router.route('/').post(async (req, res) => {
    const obj = req.body;
    const result = await PermsBLL.addPerm(obj);
    res.status(201).json(result);

  });
  

// Update a user
  router.route('/:id').put(async (req, res) => {
    try {
        console.log('in update router!')
      const { id } = req.params;
      const obj = req.body;
      const result = await PermsBLL.updatePerms(id, obj);
      res.json(result);
    } catch (error) {
      res.status(500).json('There was an error!');
    }
  });


// Delete a subsecriber
router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const result = await PermsBLL.deletePerms(id);
    res.json(result);
  });

module.exports = router;
