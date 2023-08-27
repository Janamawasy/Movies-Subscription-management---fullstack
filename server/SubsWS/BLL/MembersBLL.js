const MembersDAL = require('../DAL/MembersDAL');
const Member = require('../Models/MemberModel')

const getMembersData = async () => {
    const Members = await MembersDAL.getMembers();
    const Membersdata = [];
    Members.forEach((member) => {
        Membersdata.push({
        name: member.name,
        email: member.email,
        city: member.address.city,
      });
    });
    return Membersdata
}

const PopulateMembers = async () => {
    try {
      const existingMembers = await Member.find({});
  
      if (existingMembers.length === 0) {
        const PopulatedMembers = await MembersDAL.insertMembers(await getMembersData());
        return PopulatedMembers;
      } else {
        return "Members collection already populated.";
      }
    } catch (error) {
      // Handle any errors that might occur during the process
      console.error("Error populating movies:", error);
      throw error;
    }
}

// GET - Get All - Read
const getAllMembers = () => {
  return Member.find({});

};

// GET - Get By ID - Read
const getMemberById = (id) => {
    return Member.findById({ _id: id });
  };

// Post - Create a new Member - Create
const addMember = async (obj) => {
    const mem = new Member(obj);
    await mem.save();
    return 'Created!';
  };
  
// PUT - Update a Member - Update
const updateMember = async (id, obj) => {
    await Member.findByIdAndUpdate(id, obj);
    return 'Updated!';
  };
  
  
// DELETE - Delete a Member - Delete
const deleteMember = async (id) => {
    await Member.findByIdAndDelete(id);
    return 'Deleted!';
  };

module.exports = { 
    getAllMembers,
    getMembersData, 
    PopulateMembers, 
    getMemberById,
    addMember,
    updateMember,
    deleteMember,
};

