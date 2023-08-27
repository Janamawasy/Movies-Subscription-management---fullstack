const axios = require('axios');
const urlMembers = 'https://jsonplaceholder.typicode.com/users';
const Member = require('../Models/MemberModel')

const getMembers = async ()=>{
    console.log('IN getMembers DAL')
    const {data: members} = await axios.get(urlMembers)
    return members
}

const insertMembers = async (membersData) => {
    console.log('IN insertMembers DAL')
    const insertedMem = await Member.insertMany(membersData, { timeout: 30000 }); // Increase timeout to 30 seconds
    console.log('Database populated successfully.');
    return insertedMem
}

module.exports = { getMembers , insertMembers};


