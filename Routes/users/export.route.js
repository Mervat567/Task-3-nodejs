let app=require("express").Router()
let exportController=require("../../Controller/export.controller")

app.get("/export/users",exportController.exportUsers)

module.exports=app