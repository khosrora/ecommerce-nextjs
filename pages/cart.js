import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { DataContext } from "../store/GlobalState";
import CartItem from './../components/cartItem';
import { getData, postData } from "../utils/fetchData";
import Router from 'next/router'

const Cart = () => {

    const { state, dispatch } = useContext(DataContext);
    const { auth, cart } = state;

    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");

    let error;
    if (address.length >= 100) {
        error = "آدرس نباید بیشتر از 100 کاراکتر باشد"
    }

    useEffect(() => {
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(res)
        }
        getTotal();
    }, [cart])

    useEffect(() => {
        const cartLocal = JSON.parse(localStorage.getItem("__next__cart01__khRA"));
        if (cartLocal && cartLocal.length > 0) {
            let newArr = [];
            const updateCart = async () => {
                for (const item of cartLocal) {
                    const res = await getData(`product/${item._id}`)
                    const { _id, title, images, price, inStock, sold } = res.product;
                    if (inStock > 0) {
                        newArr.push({ _id, title, images, price, inStock, quantity: item.quantity > inStock - sold ? 1 : item.quantity })
                    }
                }
                dispatch({ type: "ADD_CART", payload: newArr })
            }
            updateCart();
        }
    }, [])

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const res = await postData("order/payment", { orders: cart, total, userId: auth.user._id, address });
            console.log(res)
            return Router.push(res.url)
        } catch (err) {
            console.log(err.message);
        }
    }

    if (cart.length === 0) return <h2>سبد خرید شما خالی است</h2>
    return (
        <div>
            <Head>
                <title>سبد خرید</title>
            </Head>
            <div className="container p-8 mx-auto mt-6">
                <div className="w-full overflow-x-auto">
                    <div className="my-2">
                        <h3 className="font-bold">سبد خرید شما</h3>
                    </div>
                    <table className="w-full shadow-inner">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 whitespace-nowrap">عکس محصول</th>
                                <th className="px-6 py-3 whitespace-nowrap">عنوان</th>
                                <th className="px-6 py-3 whitespace-nowrap">تعداد</th>
                                <th className="px-6 py-3 whitespace-nowrap">قیمت</th>
                                <th className="px-6 py-3 whitespace-nowrap">حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map(item => (
                                    <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                                ))
                            }
                        </tbody>
                    </table>
                    <form action="#" method="POST">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700"> آدرس </label>
                                <div className="mt-1">
                                    <textarea value={address} onChange={e => setAddress(e.target.value)} id="address" name="address" rows="3" className="shadow-sm p-2 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="لطفا آدرس خود را وارد کنید"></textarea>
                                    <span className="text-sm text-red-600">
                                        {error ? error : null}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                    {
                        address.length > 10
                            ?
                            // <Link href={auth.user ? "#" : "/signIn"}>
                            //     <p className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                            //         پرداخت  {total} تومان
                            //     </p>
                            // </Link>
                            <p onClick={handlePayment} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                                پرداخت  {total} تومان
                            </p>
                            :
                            <p className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                                لطفا ابتدا آدرس را وارد کنید
                            </p>
                    }
                </div>
            </div>
        </div>
    );
}
Cart.layout = "L1";
export default Cart;