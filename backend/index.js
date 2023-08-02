const express = require("express");
// const mongoose = require("mongoose");
const app = express();
const port = 5001;
const cors = require("cors");




app.use(cors());
app.use(express.json());
//route for the client Requests
app.use('/api/client',require('./ApiRoutes/ClientRoutes/Request'))
//route for creating admin credential
app.use('/api/admin',require('./ApiRoutes/AdminRoutes/Sign_up_in'))
//route for admin accessing client request DB
app.use('/api/admin',require('./ApiRoutes/AdminRoutes/ClientRequests'))
//route for admin to create a new emplooy
app.use('/api/admin',require('./ApiRoutes/AdminRoutes/Emplooy'))



app.listen(port,(err)=>{
    if(err) console.log(err);
    console.log('server listengin on port',port);
    })
    
    const connecttoMongo = require('./ConnectMongo')
    connecttoMongo();