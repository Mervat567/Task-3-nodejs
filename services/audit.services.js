let events = require('events')
let Audit=require("../modules/Audit/audit.model")

let audit=class Audit{
 constructor(auditAction,data,status,error,auditBy,auditOn){
 this.auditAction=auditAction
 this.data=data,
 this.status=status,
 this.error=error,
 this.auditBy=auditBy,
 this.auditOn=auditOn
 }
}


let emitter=new events.EventEmitter()
let auditEvent="audit"
emitter.on(auditEvent,async(audit)=>{
let form={
    auditAction:audit.auditAction,
    auditData:audit.data,
    auditStatus:audit.status,
    errorMessage:audit.error,
    auditBy:audit.auditBy,
    auditOn:audit.auditOn
}
const newAudit=new Audit(form)
await newAudit.save()
})

exports.prepareAudit=(auditAction,data,error,auditBy,auditOn)=>{
   var status=200
   if(error)
      status=500
      let auditObj=new audit(auditAction,data,status,error,auditBy,auditOn)
      emitter.emit(auditEvent,auditObj)
   
}