const mongoose=require("mongoose");
let bcrypt=require("bcrypt");
let saltrounds=5;
let userSchema=mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    userName:String,
    age:Number,
    image:Object,
    isActive:{
      type:Boolean,
       default:false
    },
    favTeams:[String],
    userBlogs:[{
      type:mongoose.Types.ObjectId,
      ref:"blogs"
    }],
    // role:{
    //   type:String,
    //   enum:["superAdmin","admin","premiumUser","user"],
    //   default:"user"
    // },
    
})

userSchema.methods.display=()=>{
  console.log("I am a user");
}
userSchema.pre("save",async function(next){
  this.password=await bcrypt.hash(this.password,saltrounds);
  next();
})

userSchema.post("save",async function(){
  console.log(this._id)
})




let userModel=mongoose.model("users",userSchema);
module.exports=userModel;