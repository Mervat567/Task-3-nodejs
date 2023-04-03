const router=require("express").Router();
const userController=require("../../Controller/user.controller")
let{confirmPasswordValidation,addUserValidation,
updateUserValidation}=require("../../validation/user.validation")
let validator=require("../../helpers/common.validate")
let {checkSessions}=require("../../utils/checkAuth.util")
let{verifyToken}=require("../../utils/token.utils")
let endPoints=require("../../helpers/endPoints")
let checkRole=require=("../../utils/checkRole.util")


//user routes
router.get("/getAllUsers",
//checkSessions,//checkRole(endPoints.GET_ALL_USERS)],
userController.getAllUsers); //verifytoken
router.get("/getUserBlogs/:userId", userController.getUserBlogs);
router.get("/user/:id",userController.getUserById);

router.post("/register", userController.register);
router.get("/activateUser/:token",userController.activateUser);
router.post("/login",userController.login);
router.post("/generateRecoveryCode",userController.generateRecoveryCode);
router.get("/checkRecoveryCode/:code",userController.checkRecoveryCode)


router.put("/updateUser/:id",
// validator(updateUserValidation) 
userController.updateUser);

router.delete("/deleteUser/:id",
// checkSessions, //checkRole(endPoints.DELETE_USER)], 
 userController.deleteUser);


module.exports=router


