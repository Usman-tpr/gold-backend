const User = require("../models/UserModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const signup = async (req, res) => {
    try {
        console.log(req.body)
        const { name, phone, password, location } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newlyData = new User({
            name,
            phone,
            password: hashedPassword,
            location
        })
        await newlyData.save();
       
        const token = jwt.sign(
            { userId: newlyData._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.send({
            success: true,
            message: "Added Successfully",
            body: newlyData,
            token: token
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Error While Adding Data" + error,
            error: error
        })
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ phone: req.body.phone });

        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                return res.status(200).json({
                    message: "Login successful",
                    user: user
                });
            } else {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

const getUser = async (req, res) => {
    try {

        const user = await User.findById(req.user.userId)
        res.send({
            success: true,
            message: "Retrieved Successfully",
            body: user
        })
    } catch (error) {
        res.send({
            success: true,
            message: "error while retrieving" + error,
            body: null
        })
    }
}
const getUserById = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
        res.send({
            success: true,
            message: "Retrieved Successfully",
            body: user
        })
    } catch (error) {
        res.send({
            success: true,
            message: "error while retrieving" + error,
            body: null
        })
    }
}

module.exports = {
    signup,
    getUser,
    login,
    getUserById
}