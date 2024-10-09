const routes = require("express").Router();
const { signup , getUser,login , getUserById } = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")
routes.post("/" , signup);
routes.get("/" ,authMiddleware, getUser)
routes.get("/login" , login)
routes.get("/:id" , getUserById)

module.exports = routes