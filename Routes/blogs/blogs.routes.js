const router=require("express").Router()
const blogController=require("../../Controller/blogs.controller")

//routes
router.get("/getAllBlogs",blogController.getAllBlogs)
router.get("/getBlogByTitle/:title",blogController.getBlogByTitle)
router.get("/getBlogPaginated",blogController.getBlogPaginated)

router.post("/addNewBlog/:userId",blogController.addNewBlog)

router.put("/updateBlog",blogController.updateBlog)

router.delete("/deleteBlog/:userId/:blogId",blogController.deleteBlog)

module.exports=router