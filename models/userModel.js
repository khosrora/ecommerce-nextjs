import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, default: "user" },
    root: { type: Boolean, default: false },
    avatar: { type: String, default: "https://picsum.photos/200" }
}, { timestamps: true });

let Dataset = mongoose.model.user || mongoose.model("user", userSchema);
export default Dataset;