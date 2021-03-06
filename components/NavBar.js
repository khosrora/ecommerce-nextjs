import { useContext } from "react"
import Link from "next/link";
import { useRouter } from "next/router"
import { DataContext } from "./../store/GlobalState"
import Cookie from "js-cookie"


const NavBar = () => {

    const { state, dispatch } = useContext(DataContext);
    const { auth, cart } = state;

    const router = useRouter();
    const isActive = (r) => {
        if (r === router.pathname) {
            return " text-red-900"
        } else {
            return ""
        }
    }

    const handleLogOut = () => {
        Cookie.remove("refreshtoken", {
            path: "api/auth/accessToken",
        });
        localStorage.removeItem("firstLogin")
        dispatch({ type: "AUTH", payload: {} });
        router.push("/")
        dispatch({ type: "NOTIFY", payload: { success: "شما از وب سایت خارج شدید" } });
    }


    const loggedRouter = () => {
        return (
            <>
                <li>
                    <Link href="/profile">
                        <a className={"hover:text-red-900" + isActive("/profile")}>
                            <span>پروفایل</span>
                        </a>
                    </Link>
                </li>
                {
                    auth.user.role === "admin"
                    &&
                    <li>
                        <Link href="/admin/dashboard">
                            <p className="cursor-pointer">
                                پنل مدیریت
                            </p>
                        </Link>
                    </li>

                }
                <li onClick={handleLogOut}>
                    <p className="cursor-pointer">
                        خروج
                    </p>
                </li>
            </>
        )
    }

    return (
        <nav className="bg-white border-gray-200 sm:px-2 py-2.5 rounded dark:bg-gray-800 shadow">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="#" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">فروشگاه رابا</span>
                </a>
                <div className="flex md:order-2">
                    <div className="hidden relative mr-3 md:mr-0 md:block">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" ></path></svg>
                        </div>
                        <input type="text" id="email-adress-icon" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="جست و جو" />
                    </div>
                    <button data-collapse-toggle="mobile-menu-3" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-3" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" ></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
                    </button>
                </div>
                <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-3">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-4 md:mt-0 md:text-sm md:font-bold md:gap-x-8">
                        <li className="relative">
                            <Link href="/cart">
                                <a className={"hover:text-red-900" + isActive("/cart")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="absolute -top-2 flex justify-center items-center rounded-full p-1 h-4 w-4 bg-red-700 text-white">{cart.length}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className={"hover:text-red-900" + isActive("/")}>خانه</a>
                            </Link>
                        </li>
                        {
                            Object.keys(auth).length === 0 ?
                                <>
                                    <li>
                                        <Link href="/signIn">
                                            <a className={"hover:text-red-900" + isActive("/signIn")}>ثبت نام / ورود</a>
                                        </Link>
                                    </li>
                                </>
                                :
                                loggedRouter()
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;