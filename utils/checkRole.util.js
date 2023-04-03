//super admin ==>delete user, delete blog, get all blogs, get all users
//admin==> delete blog,get all blogs, get all users
//premium user==>get all blogs, get all users
//user==>get all blogs

const rbac=require("../helpers/rbac")

module.exports=(endPoint)=>{
   return async(req,res,next)=>{
    const isAllowed=await rbac.can(req.session.user.role,endPoint)
    isAllowed ? next():res.status(401).json({message:"unauthorized"})
   }
}