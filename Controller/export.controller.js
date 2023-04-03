let blog=require("../modules/blog.repo")
let user=require("../modules/user.repo")

const createCsvWriter = require('csv-writer').createObjectCsvWriter
let path=require("path")
const fs=require("fs")


exports.exportBlogs=async(req,res)=>{
     
    try{
    let result=await blog.list()
    let data=JSON.parse(JSON.stringify(result.records))
    const csvWriter = createCsvWriter({
        path: 'blogs.csv',
        header: [
            {id: '_id', title: 'ID'},
            {id: 'title', title: 'title'},
            {id: 'content', title: 'content'}
        ]
    });

    csvWriter.writeRecords(data)       // returns a promise
        .then(() => {
            console.log('...Done');
            res.download(path.join(__dirname,"../blogs.csv"),()=>{
            console.log("file download successfully")
            fs.unlinkSync("./blogs.csv")
            })
        });
    }catch(err){
     console.log("err.message"+err.message)
     res.status(500).json({error:"Unexpected eror"})
    }
}

exports.exportUsers=async(req,res)=>{
     
    try{
    let result=await user.list()
    let data=JSON.parse(JSON.stringify(result.records))
    const csvWriter = createCsvWriter({
        path: 'users.csv',
        header: [
            {id: '_id', title: 'ID'},
            {id: 'firstName', title: 'firstName'},
            {id: 'lastName', title: 'firstName'},
            {id: 'email', title: 'firstName'},
            {id: 'password', title: 'firstName'},
            {id: 'userName', title: 'firstName'},
            {id: 'age', title: 'firstName'}
        ]
    });

    csvWriter.writeRecords(data)       // returns a promise
        .then(() => {
            console.log('...Done');
            res.download(path.join(__dirname,"../users.csv"),()=>{
            console.log("file download successfully")
            fs.unlinkSync("./users.csv")
            })
        });
    }catch(err){
     console.log("err.message"+err.message)
     res.status(500).json({error:"Unexpected eror"})
    }
}



