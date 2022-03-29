import connectDB from "../../../utils/connectDb";
import Orders from "../../../models/orderModels"
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);

connectDB();




// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await getVerifyPayment(req, res)
            break;
    }
}


const getVerifyPayment = async (req, res) => {
    try {
        console.log(req.body);
        const { Authority, Status } = req.body;
        if (Status === "OK") {
            const order = await Orders.findOne({ Authority });
            order.paid = true;
            await order.save();
            return res.status(200).json({
                msg: 'پرداخت شما موفقیت آمیز بود',
                order
            })
        } else {
            return res.status(400).json({
                msg: "پرداخت موفقیت آمیز نبود"
            })
        }
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}