const express = require("express");
const app = express();
const cors = require('cors')
const path = require('path')
const mongoose = require("mongoose");
 require("dotenv").config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log("Connected the database and the Running port is 5000")
    })
}).catch((err)=>{
     console.log("Error while connecting to database" , err)
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
    origin:"https://gold-backend-zeta.vercel.app"
}))
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes")
const homeRoutes  = require("./routes/HomeRoutes")
 

app.use(express.json());
app.listen("/" , (req , res) =>{
res.send("welcome")
})
app.use("/user" , userRoutes)
app.use("/product" , productRoutes)
