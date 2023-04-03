let app=require("express").Router()
let exportController=require("../../Controller/export.controller")

app.get("/export/blogs",exportController.exportBlogs)

module.exports=app