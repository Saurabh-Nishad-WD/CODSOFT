const errorMiddleware =  (err,req,res,next) => {
    const { code, message, error = "" } = err;
    res.status(err.code).send({
    message:err.message,
    error:err.error
});

};

export default errorMiddleware;