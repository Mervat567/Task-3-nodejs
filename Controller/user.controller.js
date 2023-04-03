const User=require("../modules/user.model")
const bcrypt=require("bcrypt")
let {generateToken}=require("../utils/token.utils")
let{sendMail}=require("../utils/email.util")
let day=3600000*24;
const loggingService=require("../services/logger.services")
const userLogger=new loggingService("user","user.controller")
const auditService=require("../services/audit.services")

const dateFormat=()=>{
    return new Date(Date.now())//.toLocaleString()
}

//adNewUser
let register = async (req, res) => {
   let user=new User(req.body);
   await user.save();
    let randomActivationToken=Math.random()*1000000;
     req.session.user=user;
     req.session.activationToken=randomActivationToken;
     await req.session.save();

    let activationLink=`http://localhost:3000/activateUser/${randomActivationToken}`
    let reciever=req.body.email;
    let subject="Activate Your Account";
    let text="you have created a new account,please click this link to activate your account";
    let html=`<a>${activationLink}</a>`
    await sendMail(reciever,subject,text,html)
    res.status(200).json({message:"success"})
}


//activateUser
let activateUser=async(req,res)=>{
    let token=req.params.token;
    if(token==req.session.activationToken){
        let user=await User.findByIdAndUpdate({_id:req.session.user._id},{isActive:true});
        res.status(201).json({message:"success",user});
    }
    else res.status(400).json({message:"Incorrect Token"})
}


//comparePassword
let login=async (req,res)=>{
    const {email,password}=req.body;
    let user=await User.findOne({email});
    if(user){
     var match=await bcrypt.compare(password,user.password);
    

    // if(user.isActive==false) return res.status(403).json({message:"Check Your Email for activation link"})

    if(match){
        // const token=await generateToken({user})
        // req.session.cookie.expires=new Date(Date.now()+day)
        // req.session.cookie.maxAge=day
        // req.session.user=user
        //  await req.session.save()
        res.status(201).json({message:"success",code:201})
    }
    else{
        res.status(400).json({message:"incorrect password",code:400})
    }
}
else{
    res.status(404).json({message:"user not found",code:404})
}
}


//generateRecoveryCode
let generateRecoveryCode=async(req,res)=>{
    let randomCode=Math.random()*1000000;
     req.session.randomCode=randomCode;
     await req.session.save();
    let reciever=req.body.email;
    let subject="Reset Your Password";
    let text="you have forgotten your password,here is your recovery code";
    let html=`<h1>${randomCode}</h1>`
    await sendMail(reciever,subject,text,html)
    res.status(200).json({message:"success"})
}


//checkRecoveryCode
let checkRecoveryCode=async(req,res)=>{
   recoveryCode=req.params.Code;
   if(recoveryCode==req.session.randomCode)  res.status(200).json({message:"success"})
    else return res.status(400).json({message:"Incorrect Code"})
}


//getUserById 
const getUserById=async(req,res)=>{
    try{
    let id=req.params.id;
     let user=await User.findById({_id:id}).select("-password");
     let info={Action:req.originalUrl,Status:200}
     userLogger.info("Return userById",info)
     auditService.prepareAudit("GET USERID",user,null,"user",dateFormat())
     res.status(200).json({message:"success",user})
    }catch(err){
        console.log(`err.message`, err.message)
        userLogger.error(err.message)
        auditService.prepareAudit("GET USERID",null,err,"user",dateFormat())
        res.status(500).json({error: "Unexpected Error!"})
    }

}


//getAllUsers
const getAllUsers=async(req,res)=>{
    try{
    let allUsers=await User.find({})
    let info={Action:req.originalUrl,Status:200}
    userLogger.info("Return All Users",info)
    auditService.prepareAudit("GET_ALL_USERS",allUsers,null,"user",dateFormat())
    res.status(200).json({message:"success",users:allUsers,code:200})
    }catch(err){
        console.log(`err.message`, err.message)
        userLogger.error(err.message)
        auditService.prepareAudit("GET_ALL_USERS",null,err,"user",dateFormat())
        res.status(500).json({error: "Unexpected Error!"})
    }

}


//getUserBlogs
let getUserBlogs=async(req,res)=>{
    try{
       let userId=req.params.userId;
        let userBlogs=await User.findById({_id:userId}).populate("userBlogs");
        let info={Action:req.originalUrl,Status:200}
        userLogger.info("Return All User Blogs",info)
        auditService.prepareAudit("GET_ALL_USER_BLOGS",userBlogs,null,"user",dateFormat())
        res.status(200).json({message:"success",userBlogs:userBlogs.userBlogs});
    }catch(err){
        console.log(`err.message`, err.message)
        userLogger.error(err.message)
        auditService.prepareAudit("GET_ALL_USER_BLOGS",null,err,"user",dateFormat())
        res.status(500).json({error: "Unexpected Error!"})
    }
     }
    

//updateUsers
const updateUser=async(req,res)=>{
    const targetUserId=req.params.id;
    let{firstName,lastName,email,password,userName,age,favTeams}=req.body;
    let user=await User.findByIdAndUpdate({_id:targetUserId},{firstName,lastName,email,password,userName,age,favTeams});
    res.status(201).json({message:"success",user,code:201});
}


//deleteUsers
const deleteUser=async(req,res)=>{
    
    let targetUserId=req.params.id
    await User.findByIdAndDelete({_id:targetUserId})
    res.status(201).json({message:"success"})
}
 


module.exports = {
    register,
    getUserById,
    getAllUsers,
    getUserBlogs,
    updateUser,
    deleteUser,
    login,
    activateUser,
    generateRecoveryCode,
    checkRecoveryCode
    
}