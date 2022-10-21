const express = require('express');

const app = express();

app.use('/',(req,resp)=>{
    resp.send("Hello World");
});


app.listen(3000);