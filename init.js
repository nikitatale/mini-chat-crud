const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main().then(() => {
    console.log('Successfully Connected')
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatApp')
}

let chats = [
    {
        from: 'Neha',
        to: 'Rahul',
        message: 'Hello rahul, How are You??',
        created_at: new Date(),
    },
    {
        from: 'Aman',
        to: 'Shraddha',
        message: 'Can you send me the report?',
        created_at: new Date(),
    },
    {
        from: 'Manager',
        to: 'Corporate Buddies',
        message: 'Team, Quick reminder- we have the client presentation tomorrow at 11 AM.',
        created_at: new Date(),
    }
]

Chat.insertMany(chats);