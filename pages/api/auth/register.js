import connectDB from "../../../utils/connectDb";
import Users from "./../../../models/userModel";
import valid from "../../../utils/validation";
import bcrypt from "bcrypt"

connectDB();




// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try {
        // ! get body
        const { name, email, phoneNumber, password, confirmPassword } = req.body;
        // ! validation
        const errMsg = valid(name, email, phoneNumber, password, confirmPassword);
        if (errMsg) return res.status(400).json({ err: errMsg });
        // ! check register user
        const user = await Users.findOne({ email });
        if (user) return res.status(400).json({ msg: "شما ثبت نام کرده اید" })
        // ! password hashing
        const passwordHash = await bcrypt.hash(password, 12);
        // ! create user
        const newUser = await new Users({ name, email, phoneNumber, password: passwordHash })
        await newUser.save();
        res.json({ msg: "ثبت نام با موفقیت انجام شد" })

    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}