import connectDB from "../../../utils/connectDb";
import Users from "./../../../models/userModel";
import valid from "../../../utils/validation";
import bcrypt from "bcrypt"

connectDB();




export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, phoneNumber, password, confirmPassword } = req.body;
        const errMsg = valid(name, email, phoneNumber, password, confirmPassword);
        if (errMsg) return res.status(400).json({ err: errMsg });

        const passwordHash = await bcrypt.hash(password, 12);
        const newUser = await new Users({ name, email, phoneNumber, password: passwordHash })
        console.log(newUser);
        await newUser.save();
        res.json({ msg: "ثبت نام با موفقیت انجام شد" })

    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}