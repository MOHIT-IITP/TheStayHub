import mongoose from "mongoose";

export const ConnectToDb = async(req, res) => {
    try {
        await mongoose
        .connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("MONGODB Connected Successfully");
        })
        .catch((error)=>{
            console.log("Error", error);
        })
    } catch (error) {
        console.log("Error in mongodb connection controller", error);
    }
}
