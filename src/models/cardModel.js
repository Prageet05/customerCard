const mongoose=require("mongoose")
const ObjectId=mongoose.Schema.ObjectId

const cardSchema=new mongoose.Schema({
    cardNumber:{
        type:String,
        required:true,
        trim:true
    },
    cardType:{
        type:String,
        required:true,
        trim:true
    },
    customerName:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        trim:true,
        default:Active
    },
    vision:{
        type:String,
        trim:true
    },
    customerId:{
        type:ObjectId,
        ref:"Customer",
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("Card" ,cardSchema)