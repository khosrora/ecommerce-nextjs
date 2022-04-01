import connectDB from "../../../../utils/connectDb";
import Users from "../../../../models/userModel"

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getUsers(req, res)
            break;
    }
}

const getUsers = async (req, res) => {
    try {
        const allUsers = await Users.find().select("-password");
        return res.status(200).json({
            users: allUsers,
            result: allUsers.length
        })

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}