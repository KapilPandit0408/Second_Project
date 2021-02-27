const mongoose=require("mongoose");

//Product Schema 

const productSchema=new mongoose.Schema({
    id:String,
    name:{
        type:String,
        required:[true,'please provide product name']
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    catid:{
        type:String,
    },
    catname:
    {
        type:String
    }
})

//Converting Product Schema into Model

module.exports=mongoose.model("product",productSchema);