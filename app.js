const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const app=express();
const catogryRoutes=require("./routes/catogeryRoutes")
const productRoutes=require("./routes/productRoutes")


//Method override for put and delete
var override=require("method-override");
app.use(override('_method'));

// Setting view engine to ejs
app.set("view engine","ejs");

//Serving static css file inside public folder
app.use(express.static(__dirname + "/public"));

//Connection string 
const url=process.env.MONGO_URL || "mongodb://localhost/nimap"

//Db connection
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},function(err,db)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("connected to database");
    }
});

//basic route redirection
app.get("/",(req,res)=>{
    res.redirect("/category");
})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//redirecting to respected routes

app.use("/category",catogryRoutes);
app.use("/product",productRoutes);

module.exports=app;