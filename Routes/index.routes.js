let app=require("express").Router()

let userRoutes=require("./users/user.route")
let blogRoutes=require("./blogs/blogs.routes")

app.use(userRoutes)
app.use(blogRoutes)


module.exports=app