import mongoose from "mongoose"
const connectDb = async (req,res) =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongoDB server at ${mongoose.connection.host}`);
    }
    catch(err){
        console.log("faield to connect at server")
         res.status(500).send({
            message:"error",
            err
        });
    }
}

export default connectDb;