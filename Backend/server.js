const express=require("express");
require('dotenv').config()
const mongoose=require('mongoose')
const cors = require('cors')
const app=express();
const taskRoutes=require('./routes/taskRoute');


app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_DB)
    .then(app.listen(process.env.PORT,()=>{
        console.log("MongoDB is connected successfully server is running on port "+process.env.PORT);
    })).catch((error)=>console.log(error));

app.use('/',(req,res)=>{res.json("Welcome")})

app.use('/task',taskRoutes);
