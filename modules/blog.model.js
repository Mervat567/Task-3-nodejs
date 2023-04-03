const mongoose=require("mongoose");
let blogSchema=mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
})

let blogModel=mongoose.model("blogs",blogSchema);
module.exports=blogModel