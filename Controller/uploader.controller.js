let user=require("../modules/user.repo")
let fs=require("fs")

exports.uploadImage=async(req,res)=>{
  try{
   let image=req.files;
   const result=await user.isExist({_id:req.body._id})
   if(result.success){
    // let oldImage=result.record.image
    // if(oldImage){
    //   await fs.unlinkSync(oldImage.path)
    // }
   const upload=await user.update(req.body._id,{image:image[0]})
   res.status(200).json({image:upload.record.image});

   }
   else{
    res.status(404).json(result.error);
   }
  }catch(err){
    console.log(`err.message`, err.message);
    res.status(500).json({error: "Unexpected Error!"});
  }
}



