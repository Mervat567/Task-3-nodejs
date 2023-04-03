let session=require("express-session");
const { collection } = require("../modules/blog.model");
let mongoSessionStrore=require("connect-mongodb-session")(session)


let sessionStore=new mongoSessionStrore({
    uri:process.env.CONNECTION_STRING,
    collection:"mySessions"
})


sessionStore.on("error",(err)=>{
    console.log(`Mongo Session Store Error`,err)
})


module.exports=session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:sessionStore,
    cookie:{secure:false}
})