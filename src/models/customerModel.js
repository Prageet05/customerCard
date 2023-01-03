const mongoose=require("mongoose")

const customerSchema=new mongoose.Schema({
    firstName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    mobileNumber:{
        type:String,
        trim:true
    },
    DOB:{
        type:Date
    },
    emailID:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
    customerID:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        trim:true
    }
},{timestamps:true})

module.exports=mongoose.model("Customer",customerSchema)