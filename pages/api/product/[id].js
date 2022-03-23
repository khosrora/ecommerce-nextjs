import connectDB from "../../../utils/connectDb";
import Products from "./../../../models/productModel";


connectDB();




// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProduct(req, res)
            break;
    }
}


const getProduct = async (req, res) => {
    try {
        // ! get one product
        const { id } = req.query;
        const product = await Products.findById(id);
        if (!product) return res.status(400).json({err : "صفحه مورد نظر شما پیدا نشد"})
            // ! send to client
            res.json({
                product
            })
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}