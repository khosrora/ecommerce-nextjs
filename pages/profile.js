import { useContext, useState, useEffect } from "react"
import Link from "next/link"
import Head from "next/head";
import { DataContext } from "../store/GlobalState";
import { patchData } from "../utils/fetchData"

import { imageUpload } from "../utils/imageUpload"


import valid from "../utils/validation"
import Order from './../components/order';

const Profile = () => {

    const initialState = {
        avatar: "",
        name: "",
        phoneNumber: "",
        password: "",
        cf_password: ""
    }

    const [data, setData] = useState(initialState);
    const { avatar, name, password, cf_password, phoneNumber } = data;

    const { state, dispatch } = useContext(DataContext)
    const { auth, notify, orders } = state;

    useEffect(() => {
        if (auth.user) setData({ ...data, name: auth.user.name })
    }, [auth.user])

    const handleChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        dispatch({ type: "NOTIFY", payload: {} })
    }

    const handleUpdateProfile = e => {
        e.preventDefault();
        if (password) {
            const errMsg = valid(name, auth.user.email, phoneNumber, password, cf_password);
            if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
            updatePassword();
        }

        if (name !== auth.user.name || avatar) updateInformation()

    }

    const updatePassword = () => {
        dispatch({ type: "NOTIFY", payload: { loading: true } });
        patchData("user/resetPassword", { password }, auth.token).then(res => {
            if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.msg } });

            return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        })
    }

    const updateInformation = async () => {
        let media;
        dispatch({ type: "NOTIFY", payload: { loading: true } });
        if (avatar) media = await imageUpload([avatar], auth.user._id);
        dispatch({ type: "NOTIFY", payload: { loading: false } });
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0];
        if (!file) return dispatch({ type: "NOTIFY", payload: { error: "???????? ???? ?????? ???????????? ????????" } });
        if (file.size > 1024 * 1024) return dispatch({ type: "NOTIFY", payload: { error: "???????? ?????? ?????? ???? ???? ???????? ??????" } });
        if (file.type !== "image/jpeg" && file.type !== "image/png") return dispatch({ type: "NOTIFY", payload: { error: "???????? ?????? ???????? ???????? ????????" } });

        setData({ ...data, avatar: file })
    }

    if (!auth.user) return <p>???? ?????? ???????????? ??????????????</p>

    return (
        <div className="">
            <Head>
                <title>?????? ????????????</title>
            </Head>
            <section className="flex flex-col text-slate-500 mt-4 gap-x-2 md:flex-row">
                <div className=" basis-1/4 text-center">
                    <div className="flex flex-col justify-center items-center border rounded p-4">
                        <p>{auth.user.role === "user" ? "?????????????? ????????????" : "?????????????? ??????????????"}</p>
                        <div className="relative">
                            <img className="rounded-full w-24 h-24" src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="?????? ??????????????" />
                            <span className="absolute top-0 right-0 left-0 bottom-0 rounded-full w-24 h-24 hover:bg-slate-300 opacity-0 hover:opacity-75 flex flex-col justify-center items-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-sm">?????????? ??????????</p>
                                <input accept="image/*" type="file" name="file" id="file_up" className="w-full h-full absolute top-0 right-0 left-0 bottom-0 opacity-0 cursor-pointer" onChange={changeAvatar} />
                            </span>
                        </div>
                        <div className="mt-4 w-full space-y-4">
                            <div className="flex flex-col justify-start items-start">
                                <label htmlFor="">??????</label>
                                <input type="text" name="name" value={name} onChange={handleChange} className="text-sm border-2 w-full rounded-md p-1" />
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <label htmlFor="">?????????? ??????????</label>
                                <input type="text" name="phoneNumber" value={phoneNumber} onChange={handleChange} className="text-sm border-2 w-full rounded-md p-1" />
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <label htmlFor="">?????? ??????????????????</label>
                                <input type="text" name="email" onChange={handleChange} className="text-sm border-2 w-full rounded-md p-1" defaultValue={auth.user.email} placeholder={auth.user.email} disabled={true} />
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <label htmlFor="">???????? ????????</label>
                                <input type="text" name="password" onChange={handleChange} value={password} className="text-sm border-2 w-full rounded-md p-1" />
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <label htmlFor="">?????????? ???????? ????????</label>
                                <input type="text" name="cf_password" onChange={handleChange} value={cf_password} className="text-sm border-2 w-full rounded-md p-1" />
                            </div>
                            <button disabled={notify.loading} onClick={handleUpdateProfile} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                ??????????????????
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border rounded p-4 basis-3/4">

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ???? ????????????
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ????????
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ??????????
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ??????????
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ????????????
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders ?
                                        orders.map(i => (
                                            <Order key={i._id} order={i} />
                                        ))
                                        :
                                        <p>???? ?????? ???????????? ??????????????</p>
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>
        </div>
    );
}

Profile.layout = "L1";

export default Profile;