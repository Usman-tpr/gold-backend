const routes = require("express").Router();
const { signup , getUser,login , getUserById } = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")
routes.post("/register" , signup);
routes.get("/" ,authMiddleware, getUser)
routes.post("/login" , login)
routes.get("/:id" , getUserById)

module.exports = routes