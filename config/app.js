const express=require("express")
const app=express()
const cors=require("cors")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

require("dotenv").config();
// const sessionAuth=require("../helpers/session.auth")
const indexRoutes=require("../Routes/index.routes")
const uploadRoutes=require("../Routes/users/upload.routes")
const exportRoutes1=require("../Routes/blogs/export.route")
const exportRoutes2=require("../Routes/users/export.route")


// const cors=require("../helpers/cors")
const{handleCorsPolicy}=require("../helpers/cors")
const connection=require('./database').connection
connection()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(cors())
app.use(handleCorsPolicy)
// app.use(sessionAuth)
app.use(express.json())
app.use(indexRoutes)
app.use(uploadRoutes)
app.use(exportRoutes1)
app.use(exportRoutes2)

module.exports=app