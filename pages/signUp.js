import { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import valid from "./../utils/validation";
import { DataContext } from "../store/GlobalState"
import { postData } from "../utils/fetchData"

const SignUp = () => {

    const initialState = { name: "", email: "", phoneNumber: "", password: "", confirmPassword: "" }
    const [userData, setUserData] = useState(initialState)
    const { name, email, password, confirmPassword, phoneNumber } = userData;

    const [state, dispatch] = useContext(DataContext)

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
        dispatch({ type: "NOTIFY", payload: {} });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const errMsg = valid(name, email, phoneNumber, password, confirmPassword);
            if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

            dispatch({ type: "NOTIFY", payload: { loading: true } });
            const res = await postData("auth/register", userData);
            console.log(res);
            if (res.err) dispatch({ type: "NOTIFY", payload: { error: res.err } });
            return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="">
            <Head>
                <title>صفحه ثبت نام کاربر</title>
            </Head>
            <div className="max-w-2xl m-auto mt-4">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            نام کاربری
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" value={name} onChange={handleChangeInput} id="username" type="text" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            پست الکترونیک
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" value={email} onChange={handleChangeInput} id="email" type="text" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                            شماره همراه
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="phoneNumber" value={phoneNumber} onChange={handleChangeInput} id="phoneNumber" type="text" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            کلمه عبور
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" value={password} onChange={handleChangeInput} id="password" type="password" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            تایید کلمه عبور
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="confirmPassword" value={confirmPassword} onChange={handleChangeInput} id="confirmPassword" type="password" />
                    </div>
                    <div className="flex flex-col items-start justify-start space-y-4">
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            ثبت نام
                        </button>
                        <Link href="/signIn" className="inline-block align-baseline   text-slate-300 hover:text-slate-900">
                            من ثبت نام کردم
                        </Link>
                    </div>
                </form >
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 RABA group
                </p>
            </div >
        </div >
    );
}

export default SignUp;