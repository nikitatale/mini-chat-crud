const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');



app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

main().then(() => {
    console.log('Successfully Connected!');
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatApp');
}

//index route

app.get('/chats', async (req, res) => {
    let chats = await Chat.find();
    res.render('chat.ejs', {chats});
})

//new chat route

app.get('/chats/new', (req, res) => {
    res.render('newChat.ejs');
});

//create route 

app.post('/chats', (req, res) => {
    let {from, message, receiver} = req.body;
    let newChat = new Chat({
        from: from,
        to: receiver,
        message: message,
        created_at: new Date(),
    });

    newChat.save().then(() => {
        console.log('Chat was saved!')
    }).catch((err) => {
        console.log(err);
    })
    
    res.redirect('/chats');  
});

//edit route

app.get('/chats/:id/edit',  async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
   res.render('edit.ejs', {chat});
})

//update route

app.patch('/chats/:id', async (req, res) => {
   let {id} = req.params;
   let newMessage = req.body.message;
   let newChat = await Chat.findByIdAndUpdate(id, {message: newMessage}, {runValidators: true, new: true});
   res.redirect('/chats')
});

//destroy route

app.get('/chats/:id/delete', async (req, res) => {
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect('/chats')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})