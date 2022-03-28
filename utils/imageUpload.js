import axios from "axios";

export const imageUpload = async (images, userId) => {
    const formData = new FormData();
    for (const item of images) {
        formData.append("file", item);
    }
    formData.append("id", userId);
    const res = await axios({
        url: "/api/user/changeAvatar",
        method: "post",
        data: formData
    })
    console.log(res);
}