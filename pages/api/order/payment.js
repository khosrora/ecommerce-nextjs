import connectDB from "../../../utils/connectDb";
import Orders from "../../../models/orderModels"
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);

import { uid } from "../../../utils/uid"

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await getOrder(req, res)
            break;
    }
}


const getOrder = async (req, res) => {
    try {
        console.log(req.body)
        const oreders = req.body.orders;
        const total = req.body.total;
        const userId = req.body.userId;
        const address = req.body.address;

        zarinpal.PaymentRequest({
            Amount: total, // In Tomans
            CallbackURL: `${process.env.BASE_URL}/payment`,
            Description: 'پرداخت به فروشگاه رابا',
            Email: 'khosrora153333@gmail.com',
            Mobile: '09332839823'
        }).then(async response => {
            if (response.status === 100) {
                console.log(response);
                const order = await Orders.create({
                    user: userId, code: String(uid()), address, cart: oreders, total, paymentId: response.authority
                });
                console.log(order);
                return res.status(200).json({ url: response.url })
            }
        }).catch(err => {
            console.error(err);
            return res.status(500).json(err.message)
        });

    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}