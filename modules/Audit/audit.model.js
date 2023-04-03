const mongoose=require("mongoose");

let AuditSchema=mongoose.Schema({
    auditOn:Date,
    auditBy:String,
    auditData:Object,
    auditStatus:Number,
    auditAction:String,
    errorMessage:Object
})

let auditModel=mongoose.model("audits",AuditSchema);
module.exports=auditModel