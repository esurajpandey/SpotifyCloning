require('dotenv').config();
const express = require('express');
const db = require('./models/db');
const user = require('./routes/user');
const song = require('./routes/song');
const subscription = require('./routes/subscription');
const tag = require('./routes/tag');
const album = require('./routes/album');
const artist = require('./routes/artist');
const library = require('./routes/library');
const search = require('./routes/search');
const playlist = require('./routes/playlist');
const podcast = require('./routes/podcast');

// const {makePayment,paymentDone,paymentCancel} = require('./payment/payment');

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/user',user);
app.use('/song',song);
app.use('/subscription',subscription);
app.use('/tag',tag);
app.use('/album',album);
app.use('/artist',artist);
app.use('/library',library);
app.use('/search',search);
app.use('/playlist',playlist);
app.use('/podcast',podcast);

app.use('/',(req,resp,next)=>{
    resp.send("Page not found");
})
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} port`);
})