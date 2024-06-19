import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register =catchAsyncError(async(req,res,next)=>{
    const {name,email,phone,role,password}=req.body;

    if(!name|| !email||!phone||!role||!password){
        return next(new ErrorHandler("Please fill full details!",400));
    }
    const isEmail=await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("Email already exists!"));

    }
    const user=await User.create({
        name,email,phone,role,password
    });
    sendToken(user,200,res,"User Registered Successfully");
});

export const login=catchAsyncError(async(req,res,next)=>{
    const {email,password,role}=req.body;
    if(!email||!password||!role){
        return next(new ErrorHandler("Please Fill all details",400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }
    if(user.role!==role){
        return next(new ErrorHandler("Role not matched!",400))
    }
    sendToken(user,200,res,"User Logged in Successfully");

});


export const logout=catchAsyncError(async(req,res,next)=>{
    res.status(201).cookie("token","",{
        expires:new Date(
            Date.now()
        ),
        httpOnly: true,
        secure:true,
        sameSite:"None",
    }).json({success:true,
        message:"User Logout successfully!",
    })  // after logout the cookie which is stored in local storage .this will make it null
})


export const getUser=catchAsyncError((req,res,next)=>{
    const user=req.user;
     console.log(user);
    // if(!user){
    //     return next(new ErrorHandler("User not found!",400));
    // }
    res.status(200).json({
        success:true,
        user,
    });
});

