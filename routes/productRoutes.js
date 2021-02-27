const express=require("express");
const router=express.Router();
const product=require("../models/productModel")





//Redirecting to Product page 1
router.get("/",(req,res)=>{
    res.redirect("/product/1");
})

       
   
 
    
    //Fetch 10 products based on page/params id
    router.get('/:page', function(req, res, next) {
        var perPage = 10
        var page = req.params.page || 1
    
        product
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function(err,  founddata) {
                product.count().exec(function(err, count) {
                    if (err) return next(err)
                    res.render('showProduct', {
                        founddata:founddata,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
    })
    



//Form to edit Product
    router.get("/:id/edit",(req,res)=>{
        product.findById(req.params.id,(err,founddata)=>{
            if(err){
                console.log(err);
            }
            else{
              res.render("editProduct",{founddata:founddata})
            }
        })
    })
    
    //Updating Product
    router.put("/:id",(req,res)=>{
        const data={name:req.body.name}
        product.findByIdAndUpdate(req.params.id,data,(err,founddata)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/product");
            }
        })
    })
    

    // Deleting Product
    router.delete("/:id",(req,res)=>{
        product.findByIdAndRemove(req.params.id,(err,founddata)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/product")
            }
        })
    })
    

    



module.exports=router;