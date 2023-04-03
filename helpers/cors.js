exports.handleCorsPolicy=async(req,res,next)=>{
   res.header("Access-Control-Allow-Origin","*")
   res.header("Access-Control-Allow-Headers","*")
   res.header("Access-Control-Allow-Credentials",true)
   const allowedMethods=["GET","POST","PUT","PATCH","DELETE"]
   res.header("Access-Control-Allow-Methods",allowedMethods)
   
   if(allowedMethods.includes(req.method)) next()
   else return res.status(403).json({message:"Blocked By Cors Policy"})
}