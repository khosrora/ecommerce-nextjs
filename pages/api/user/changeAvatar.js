import connectDB from "../../../utils/connectDb";
import nc from "next-connect";
import onError from "../../../middleware/errorMiddleware";
import Users from "../../../models/userModel";
import upload from "../../../middleware/multer";



connectDB();

export const config = {
    api: {
        bodyParser: false,
    },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await changeAvatar(req, res)
            break;
    }
}


const changeAvatar = nc(onError);


let uploadFile = upload.single("file");

changeAvatar.use(uploadFile);

changeAvatar.post(async (req, res) => {
    try {
        // ! get items body
        const filename = req.file.filename;
        const id = req.body.id;
        // ! find user 
        const user = await Users.findById(id);
        if (!user) return res.status(200).json({ err: "متاسفانه کاربر پیدا نشد" });
        // ! change avatar
        console.log(user);
        user.avatar = `${process.env.BASE_URL}/uploads/avatars/${filename}`
        await user.save();

        return res.status(200).json({ msg: "پروفایل شما با موفقیت به روز شد" })
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
})

