const SubModel = require('../Models/SubModel');

// GET - Get All - Read
const getAllSubs = () => {
  return SubModel.find({});
};

// GET - Get By ID - Read
const getSubsById = (id) => {
  return SubModel.findById({ _id: id });
};

// Post - Create a new Subs - Create
const addSubs = async (obj) => {
  const per = new SubModel(obj);
  await per.save();
  return 'Created!';
};

// PUT - Update a Subs - Update
const updateSubs = async (id, obj) => {
  await SubModel.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// PUT - Update a Subs current action number => -1 - Update
const updateSubsPlusOne = async (id, obj) => {
    obj.CurrentActions = obj.CurrentActions + 1
    await SubModel.findByIdAndUpdate(id, obj);
    return 'CurrentActions plus one Updated!';
  };

// DELETE - Delete a Subs - Delete
const deleteSubs = async (id) => {
  await SubModel.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllSubs,
  getSubsById,
  addSubs,
  updateSubs,
  deleteSubs,
  updateSubsPlusOne
};