const mongoose=require("mongoose");
const product=require("../models/productModel")


//Category Schema

const categorySchema=new mongoose.Schema({
    id:String,
    name:{
        type:String,
        required:[true,'please provide category name']
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]
})

//Middleware to delete all products belonging to category

categorySchema.post('findOneAndDelete', async function (category) {
    if (category.products.length) {
        const res = await product.deleteMany({ _id: { $in: category.products } })
        console.log(res);
    }
})



//Converting Schema into model

module.exports=mongoose.model("category",categorySchema);