const app=require('./app')
require("dotenv").config()


app.listen(process.env.PORT,()=>{
    console.log(`server is up on port ${process.env.PORT}`)
  })

  module.exports=app
