import mongoose from "mongoose";



const connectDB = () => {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected.");
        return;
    }
    mongoose.connect(process.env.MONGODB_URL).then(client => console.log("connect to database")).catch(err => console.log(err.message))
}

export default connectDB;