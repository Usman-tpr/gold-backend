const routes = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware")
const { dealDetails , getDetails , myDeals , deleteDeal, isDoneDeal } = require("../controllers/dealController")
routes.post('/create-deal',authMiddleware , dealDetails );
routes.get('/all-deals',getDetails );
routes.get('/my-deals', authMiddleware , myDeals );
routes.delete('/:id', deleteDeal );
routes.put('/completed/:id', isDoneDeal );

module.exports = routes