import connectDB from "../../../utils/connectDb";
import Orders from "../../../models/orderModels"
import auth from "../../../middleware/auth"

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getOrder(req, res)
            break;
    }
}

const getOrder = async (req, res) => {
    try {
        const result = await auth(req, res);
        let orders;
        if (result.role !== "admin") {
            orders = await Orders.find({ user: result.id }).populate("user", "-password");
        } else {
            orders = await Orders.find();
        }
        res.json({ orders })
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}