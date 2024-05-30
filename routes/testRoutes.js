const express=require("express")
const { testUserController } = require("../controllers/testController")

const router= express.Router()

router.post('/test-user',testUserController)

module.exports=router



