import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// REGISTER
// @post api/users/register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({
            message: "user already exists"
        });

    }
    try {
        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            userId: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid User data",
            error: error.message
        });
    }
};


// LOGIN
// @post api/users/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ userID: user._id, }, process.env.JWT_SECRET, { expiresIn: '30d' });

            res.status(200).json({ token });
        }
        else {
            res.status(401).json({ message: 'Invalid Email or Password ' })
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid User data",
            error: error.message
        });
    }
    } catch (error) {
        res.status(500).json({error})
    }
}

// PROFILE
// @get api/users/profile
const getUserProfile = async (req, res) => {
    try {
        const { userID } = req.user;
        try {
            const user = await User.findById(userID);
            if (user) {
                res.status(200).json({
                    name: user.name,
                    email: user.email
                })
            }
            else {
                res.status(401).json({ message: "Invalid user" })
            }
        } catch (error) {
            res.status(401).json({ error })
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error })
    }
};

// UPDATE PROFILE
// @put api/users/profile
const updateUser = async (req, res) => {
    try {
        const { userID } = req.user;
        try {
            const user = await User.findById(userID);
            if(user){
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
        
                if(req.body.password){
                    user.password = req.body.password;
                }
        
                const updateUser = await user.save();
        
                res.status(200).json({
                    _id:updateUser._id,
                    name:updateUser.name,
                    email:updateUser.email
                })
        
            }else{
                res.status(404).json({message:"User not found"});
            }
        } catch (error) {
            res.status(401).json({ message: "Invalid user" })
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error })
    }
}

export {
    registerUser,
    loginUser,
    getUserProfile,
    updateUser
};