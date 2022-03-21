import Head from "next/head"
import Link from "next/link"



const SignIn = () => {
    return (
        <div className="">
            <Head>
                <title>صفحه ورود کاربر</title>
            </Head>

            <div className="max-w-2xl m-auto mt-4">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            پست الکترونیک
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="test@yahoo.com" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            کلمه عبور
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="123456789" />
                    </div>
                    <div className="flex flex-col items-start justify-start space-y-4">
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            ورود
                        </button>
                        <Link href="/signUp" className="inline-block align-baseline   text-slate-300 hover:text-slate-900">
                            من هنوز ثبت نام نکردم
                        </Link>
                        <Link href="/" className="inline-block align-baseline text-slate-300 hover:text-slate-900">
                            کلمه عبورمُ فراموش کردم
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

export default SignIn;