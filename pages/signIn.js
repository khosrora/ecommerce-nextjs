import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { DataContext } from "../store/GlobalState"
import { postData } from "../utils/fetchData"
import Cookie from "js-cookie"
import { useRouter } from "next/router"

const SignIn = () => {
    const initialState = { email: "", password: "" }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData;

    const { state, dispatch } = useContext(DataContext)
    const { auth } = state;

    const router = useRouter();

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
        dispatch({ type: "NOTIFY", payload: {} });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            dispatch({ type: "NOTIFY", payload: { loading: true } });
            const res = await postData("auth/login", userData);
            if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });

            dispatch({ type: "NOTIFY", payload: { success: res.msg } });

            dispatch({
                type: "AUTH", payload: {
                    token: res.access_token,
                    user: res.user
                }
            });

            Cookie.set("refreshtoken", res.refresh_token, {
                path: "api/auth/accessToken",
                expires: 30
            });

            localStorage.setItem("firstLogin", true)

        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        if (Object.keys(auth).length !== 0) router.push("/")
    }, [auth, router])


    return (
        <div className="">
            <Head>
                <title>صفحه ورود کاربر</title>
            </Head>

            <div className="max-w-2xl m-auto mt-4">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            پست الکترونیک
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" value={email} onChange={handleChangeInput} type="text" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            کلمه عبور
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" value={password} onChange={handleChangeInput} type="password" />
                    </div>
                    <div className="flex flex-col items-start justify-start space-y-4">
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            ورود
                        </button>
                        <Link href="/signUp" className="inline-block align-baseline   text-slate-300 hover:text-slate-900">
                            من هنوز ثبت نام نکردم
                        </Link>
                        <Link href="/" className="inline-block align-baseline text-slate-300 hover:text-slate-900">
                            کلمه عبورمُ فراموش کردم
                        </Link>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2021 RABA group
                </p>
            </div >
        </div >
    );
}

SignIn.layout = "L1";

export default SignIn;