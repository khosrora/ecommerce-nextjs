import connectDB from "../../../utils/connectDb";
import Users from "./../../../models/userModel";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../../../utils/generateToken";

connectDB();




// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try {
        // ! get body
        const { email, password } = req.body;
        // ! check register user
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ msg: "شما ثبت نام نکرده اید" })
        // ! password check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "شما ثبت نام نکرده اید" });
        // ! generete token
        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id })

        res.json({
            msg: "خوش آمدی دوست من",
            refresh_token,
            access_token,
            user: {
                ...user._doc,
                password: "",
            }
        })

    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}