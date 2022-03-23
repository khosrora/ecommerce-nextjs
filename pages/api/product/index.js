import connectDB from "../../../utils/connectDb";
import Products from "./../../../models/productModel";


connectDB();




// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProducts(req, res)
            break;
    }
}


const getProducts = async (req, res) => {
    try {
        // ! get all products
        const products = await Products.find();
        // ! send to client
        res.json({
            status: "success",
            result: products.length,
            products
        })
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}