

// it will handle all the async error which we did not handle yet.


// this fuction will take a function as a input
export const catchAsyncError=(theFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(theFunction(req,res,next)).catch(next);
    };
};



