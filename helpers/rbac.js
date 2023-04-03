const RBAC=require("easy-rbac")
const opts=require("./policy/options")
const rbac=RBAC.create(opts)

module.exports=rbac