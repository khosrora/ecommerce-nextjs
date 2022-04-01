import connectDB from "../../../../utils/connectDb";
import Category from "../../../../models/categoriesModel"
import auth from "../../../../middleware/auth"

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await createCategory(req, res)
            break;
        case "GET":
            await getCategory(req, res)
            break;
    }
}

const createCategory = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (result.role !== "admin") return res.status(400).json({ err: "Authenticated is not valid." });

        const { name } = req.body;
        if (!name) return res.status(400).json({ err: " وارد کردن نام دسته بندی اجباری است" });
        console.log(name);
        const newCategory = new Category({ name });
        await newCategory.save();

        return res.status(200).json({
            msg: "دسته بندی ثبت شد",
            newCategory
        });

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).json({
            categories,
            result: categories.length
        });

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

