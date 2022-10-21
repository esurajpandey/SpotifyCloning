require('dotenv').config();
const express = require('express');
const db = require('./models/db');
const fileUpload = require('express-fileupload');


const app = express();
const PORT = 3000;
app.use(express.json());

app.use(fileUpload({
    useTempFiles:true
}));
app.use(express.urlencoded({ extended: true }));

const admin = require('./Admin/routes/adminRouter');
app.use('/admin',admin)

const user = require('./routes/user');
app.use('/user',user);

const song = require('./routes/song');
app.use('/song',song);

const subscription = require('./routes/subscription');
app.use('/subscription',subscription);

const tag = require('./routes/tag');
app.use('/tag',tag);

const album = require('./routes/album');
app.use('/album',album);

const artist = require('./routes/artist');
app.use('/artist',artist);

const library = require('./routes/library');
app.use('/library',library);

const search = require('./routes/search');
app.use('/search',search);

const playlist = require('./routes/playlist');
app.use('/playlist',playlist);

const podcast = require('./routes/podcast');
app.use('/podcast',podcast);

const ads = require('./routes/ads');
app.use('/ads',ads);


// const {makePayment,paymentDone,paymentCancel} = require('./payment/payment');
app.use('/',(req,resp,next)=>{
    resp.send("Page not found");
});


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} port`);
});
