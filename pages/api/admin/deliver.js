import connectDB from "../../../utils/connectDb";
import Orders from "../../../models/orderModels"
import auth from "../../../middleware/auth"

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
        const order = await Orders.findById(id);
        if (order.delivered) {
            order.delivered = false;
            await order.save()
            return res.status(200).json({ isDeliver: false })
        }
        order.delivered = true;
        await order.save()
        return res.status(200).json({ isDeliver: true })
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}