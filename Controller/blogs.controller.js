const Blog=require("../modules/blog.model");
const User=require("../modules/user.model");


//getAllBlogs
const getAllBlogs=async(req,res)=>{
   let allBlogs=await Blog.find({});
   res.status(200).json({message:"success",blogs:allBlogs})

}


//getBlogByTitle
let getBlogByTitle=async(req,res)=>{
    const blogTitle=req.params.title;
  let blog=await Blog.find({title:blogTitle});
  console.log(blog);
  if(blog){
    res.status(200).json({message:"success",blog})

  }
  else{
    res.status(404).json({message:"not found"})
  }
}


//getBlogPaginated
let getBlogPaginated=async(req,res)=>{
  let {page,size}=req.query;
  let numOfItems=parseInt(size);
  let skippedItems=(page-1)*numOfItems;
  let blogs=await Blog.find({}).limit(numOfItems).skip(skippedItems);
  res.status(200).json({message:"success",blogs})


}



// addNewBlog
let addNewBlog = async (req, res) => {
   let blog=await new Blog(req.body);
    await blog.save();
    await User.findByIdAndUpdate({_id:req.params.userId},{$push:{userBlogs:blog._id}})
   res.status(200).json({message:"success",blog})

}



// updateBlog
const updateBlog=async(req,res)=>{
    let targetBlogId=req.body.blogId;
    let{title,content}=req.body;
    let blog=await Blog.findByIdAndUpdate({_id:targetBlogId},{title,content});
    res.status(200).json({message:"success",blog})

}


// deleteBlog
const deleteBlog=async(req,res)=>{
    let targetBlogId=req.params.blogId;
    let targetUserId=req.params.userId;
    await Blog.findByIdAndDelete({_id:targetBlogId});
    await User.findByIdAndUpdate({_id:targetUserId},{$pull:{userBlogs:targetBlogId}})
    res.status(201).json({message:"success"})

}


module.exports={
    getAllBlogs,
    getBlogByTitle,
    getBlogPaginated,
    addNewBlog,
    updateBlog,
    deleteBlog
}