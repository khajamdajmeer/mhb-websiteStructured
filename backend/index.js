const express = require("express");
// const mongoose = require("mongoose");
const app = express();
const port = 5001;
// const port = 5002;
const cors = require("cors");




app.use(cors(
  
));
app.use(express.json());
//route for the client Requests
app.use('/api/client',require('./ApiRoutes/ClientRoutes/Request'))
//route for creating admin credential
app.use('/api/admin',require('./ApiRoutes/AdminRoutes/Sign_up_in'))
//route for admin accessing client request DB
app.use('/api/admin',require('./ApiRoutes/AdminRoutes/ClientRequests'))
//route for admin to create a new emplooy
app.use('/api/admin',require('./ApiRoutes/AdminRoutes/Emplooy'))

//route for the emplooy if they forgot password and this will also work as the create password by verifiing the email
app.use('/api/emplooy',require('./ApiRoutes/CommonRoutes/EmplooyPassword'))
//route for the manager for the process of teh user requests
app.use('/api/manager',require('./ApiRoutes/ManagerRoutes/Requests'))

//router for teh serach function 
app.use('/api/search',require('./ApiRoutes/ManagerRoutes/SearchRequest'))

//router for technicain access functions
app.use('/api/technician',require('./ApiRoutes/TechnicainRoutes/TechRequest'))
//router for checking authorization of technnicain on mouting the page
app.use('/api/authorization',require('./ApiRoutes/CommonRoutes/AuthorizationCheck'))
// rotue for checking admin authorization token
app.use('/api/adminauthorization',require('./ApiRoutes/CommonRoutes/AdminAuthorization'))



app.listen(port,(err)=>{
    if(err) console.log(err);
    console.log('server listengin on port',port);
    })
    
    const connecttoMongo = require('./ConnectMongo')
    connecttoMongo();