const routes = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware")
const upload = require("../config/multer");
const { add , getAll , getDropdownProducts, trendingCategory } = require("../controllers/CategoryController");

routes.post("/add", upload.single("image") , add)
routes.get("/getAll" , getAll)
routes.get("/trendingCategories" , trendingCategory)
routes.get("/get-searched-items" , getDropdownProducts )

module.exports = routes