
const Deal = require("../models/DealsModel")
const dealDetails = async (req, res) => {
    try {
        const deal = await new Deal({
            buyerId: req.user.userId,
            sellerId: req.body.sellerId,
            productId: req.body.productId
        })
        await deal.save();

        return res.status(200).json({
            success: true,
            message: "Created Deal",
            deal: deal
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "error" + error,
            product: null
        });
    }
}

const getDetails = async (req, res) => {
    try {
        const deal = await Deal.find()
            .populate("sellerId")
            .populate("buyerId")
            .populate("productId")

        return res.status(200).json({
            success: true,
            message: "Retrieved All Deals",
            deal: deal
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "error" + error,
            product: null
        });
    }
}
const myDeals = async (req, res) => {
    try {
        const id = req.user.userId
        const deals = await Deal.find({
            $or: [
                { sellerId: id },
                { buyerId: id }
            ]
        })
            .populate("sellerId")
            .populate("buyerId")
            .populate("productId");

        if (!deals || deals.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No deals found for this user.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Added",
            deal: deals
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "error" + error,
            product: null
        });
    }
}

const deleteDeal = async (req, res) => {
    try {
        const deletedDeal = await Deal.findByIdAndDelete(req.params.id);

      return  res.send({
            success: true,
            error: null,
            body: deletedDeal
        })
    } catch (error) {
        res.send({
            success: false,
            error: "error while deleting" + error,
            body: null
        })
    }
}

const isDoneDeal = async (req, res) => {
    try {
        const doneDeal = await Deal.findByIdAndUpdate(
            req.params.id,               // Directly pass the id
            { isDealDone: true },         // Fields to update
            { new: true }                 // Options (new: true returns the updated document)
        );
        
        
      return  res.send({
            success: true,
            error: null,
            body: doneDeal
        })
    } catch (error) {
        res.send({
            success: false,
            error: "error" + error,
            body: null
        })
    }
}

module.exports = {
    getDetails, dealDetails, myDeals, deleteDeal, isDoneDeal
}