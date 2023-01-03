const express=require("express")
const mongoose=require("mongoose")
const route=require("./route/route")
const app=express()

app.use(express.json())

mongoose.connect("mongodb+srv://prageet:4zGItzVIrinYLkAI@myproject.kthcntq.mongodb.net/customerCard",{useNewUrlParse:true})
.then(()=>console.log("mongoDB is connected"))
.catch(error=>console.log(error.message))

app.use("/",route)
app.listen(3000,()=>console.log("Express app running on port 3000"))