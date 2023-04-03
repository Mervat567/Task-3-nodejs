const mongoose=require("mongoose");

const connection=()=>{
    return mongoose.connect(process.env.CONNECTION_STRING ,
        {useNewUrlParser: true,useUnifiedTopology:true}
        )
    .then(()=>{
     console.log("connected to database successfully")
    }).catch((err)=>{
     console.log("MongoDB error:" + err)
    })
}

module.exports={
connection,
connect:()=>{
    mongoose.Promise=Promise
    mongoose.connect(process.env.CONNECTION_STRING )
},

disconnect:()=>{
    mongoose.disconnect()
}

}