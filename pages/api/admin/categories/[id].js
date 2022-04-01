import connectDB from "../../../../utils/connectDb";
import Category from "../../../../models/categoriesModel"
import auth from "../../../../middleware/auth"

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "PUT":
            await editCategory(req, res)
            break;
        case "DELETE":
            await deleteCategory(req, res)
            break;
    }
}

const editCategory = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (result.role !== "admin") return res.status(400).json({ err: "Authenticated is not valid." });

        const { id } = req.query;
        const { name } = req.body;

        const newCategory = await Category.findOneAndUpdate({ _id: id }, { name });

        return res.status(200).json({
            msg: "دسته بندی ویرایش شد",
            category: {
                ...newCategory._doc
                , name
            }
        });

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ err: " وارد کردن ای دی دسته بندی اجباری است" });

        await Category.findByIdAndDelete({ _id: id });

        return res.status(200).json({ msg: "دسته بندی حذف شد" });

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

