const express=require("express");

const dataBaseConnection=require("./mongodb/database");
const AuthRoutes=require("./routes/auth");
const bodyParser = require("body-parser");
require("dotenv").config();
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth",AuthRoutes)



app.use((err,req,res,next)=>{
    console.log("Error caught by middlerware:",err);
    const Errorstatus=err.status||500;
    const Errormessage=err.message||"some error happened";
    return res.status(Errorstatus).json({
        status:Errorstatus,
        message:Errormessage,
        success:false,
        stack:err.stack,
    })
})

const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
    dataBaseConnection();
})