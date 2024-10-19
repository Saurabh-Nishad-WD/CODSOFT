const errorMiddleware =  (err,req,res,next) => {
    res.status(err.code).send({
    message:"error",
    error:err.error
});

};

export default errorMiddleware;