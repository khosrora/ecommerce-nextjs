import connectDB from "../../../../utils/connectDb";
import Users from "../../../../models/userModel"

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await isDeliver(req, res)
            break;
    }
}

const isDeliver = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await Users.findById(id);
        if (user.role === "user") {
            user.role = "admin";
            await user.save()
            return res.status(200).json({ role: "admin" })
        }
        user.role = "user";
        await user.save()
        return res.status(200).json({ role: "user" })
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}