const routes = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware")
const upload = require("../config/multer");
const { add , getAll } = require("../controllers/subCategoryController");

routes.post("/add", upload.single("image") , add)
routes.get("/getAll" , getAll)

module.exports = routes