import connectDB from "../../../utils/connectDb";
import Users from "./../../../models/userModel";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../../../utils/generateToken"


connectDB();




// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    try {
        // ! get cookie
        const rf_token = req.cookies.refreshtoken;
        if (!rf_token) return res.status(400).json({ err: "لطفا ابتدا وارد شوید" });
        // ! checked cookie
        const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
        if (!result) return res.status(400).json({ err: "توکن شما منقضی شده است" });
        // ! find user
        const user = await Users.findById(result.id);
        if (!user) return res.status(400).json({ err: "کاربری وجود ندارد" });
        // ! generete token
        const access_token = createAccessToken({ id: user._id });
        // ! send data to client
        return res.json({
            access_token,
            user: {
                ...user._doc,
                password: "",
            }
        })

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}