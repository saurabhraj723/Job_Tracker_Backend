
// middleware for authorization

import {catchAsyncError} from './catchAsyncError.js';
import ErrorHandler from './error.js';
import jwt from "jsonwebtoken";
import { User } from '../models/userSchema.js';

export const isAuthoried= catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){  // Token is generated when user login
        return next(new ErrorHandler("User not authorized",400));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);  // it will verify that the tocken is generated via the same secret key;
    req.user=await User.findById(decoded.id);
    next();
})



