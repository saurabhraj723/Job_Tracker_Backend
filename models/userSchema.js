import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please provide your name!"],
        minLength :[3,"Name must contain at least 3 characters!"],
        maxLength :[30,"Name cannot exceed 30 characters!"],
    },
    email:{
        type: String,
        required: [true,"Please provide your email!"],
        validate: [validator.isEmail,"Please provide a valid email"],
    },
    phone:{
        type:Number,
        required:[true,"Please provide your mobile number"]
    },
    password:{
        type: String,
        required: [true,"Please Type your Password"],
        minLength :[10,"Name must contain at least 8 characters!"],
        maxLength :[32,"Name cannot exceed 32 characters!"],
        select: false
    },
    role:{
        type: String,
        required :[true,"Please provide your role"],
        enum:["Job-Seeker", "Employeer"],  // enum due to we have to give only 2 options.
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});



// The await keyword works only inside async functions.
// It makes JavaScript wait until a promise settles (i.e., fulfills or rejects) and then returns its result.




// hashing the password
userSchema.pre("save",async function(next){  // The Mongoose Schema API pre() method is used to add a pre-hook to the mongoose Schema methods and can be used to perform pre Schema method operations.
    if(!this.isModified("password")){  // if this password is not modified i.e no new user then simply call next function
        next();
    }
    this.password=await bcrypt.hash(this.password,10);  // if you write it 8 then will hash weakly and if 12 strong but time consuming so keep it 10.


});


// Comparing Password

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

//Generating a Jwt token for authorization

userSchema.methods.getJWTToken=function(){
    return jwt.sign({
        id:this._id
    },process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};


export const User=mongoose.model("User",userSchema);



