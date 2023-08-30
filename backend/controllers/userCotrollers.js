import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js'

//@description Auth user/set token
//route POST/api/users/auth
//@access  Public
const authUser = expressAsyncHandler(async (req,res)=>{
    const {email,password}=req.body;

    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);
        res.status(201).json({
            userId:user._id,
            name:user.name,
            email:user.email
        });
    }
    else{
        res.status(401);
        throw new Error('Innvalid Email or Password ');
    }

});

//@description Register a new user
//route POST/api/users/register
//@access  Public
const registerUser = expressAsyncHandler(async (req,res)=>{
    const {name,email,password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already Exists');
    }
    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res,user._id);
        res.status(201).json({
            userId:user._id,
            name:user.name,
            email:user.email
        });
    }
    else{
        res.status(400);
        throw new Error('Innvalid User Data');
    }
});

//@description Logout user
//route POST/api/users/logout
//@access  Public
const logoutUser = expressAsyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message:'User LogedOut'})
});

//@description Get user Profile
//route get/api/users/profile
//@access  private
const getUserProfile = expressAsyncHandler(async (req,res)=>{
    const user ={
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(200).json(user)
});


//@description Update user Profile
//route PUT/api/users/profile
//@access  private
const updateUserProfile = expressAsyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id);

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
        res.status(404);
        throw new Error('User not Found');
    }
});


//@description Get all users
//route get/api/users/allusers
//@access  public
const getUsers = expressAsyncHandler(async (req,res)=>{
    const user = await User.find({},"name email");
    res.status(200).json(user)
});


export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers
};