const router = require("express").Router()
const {signup, signin, updateUser, deleteUser, getDashboardData, getAllUsers, createAdmin} = require("../controllers/authControllers")
const verifyToken = require("../utils/verifyToken")

router.post("/signup",signup)
      .post("/signin",signin)
      .post("/create/admin",createAdmin)
      .post("/create",verifyToken,signup)
      .put("/update/:id",verifyToken,updateUser)
      .delete("/delete/:id",verifyToken,deleteUser)
      .get("/", getAllUsers)
      .get("/dashboard",verifyToken,getDashboardData)

module.exports = router
