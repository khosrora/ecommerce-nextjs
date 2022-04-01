import { useContext, useEffect } from "react"
import Link from "next/link";
import moment from 'jalali-moment'
import { DataContext } from "../store/GlobalState"
import { postData } from "../utils/fetchData"
import { updateItem } from "../store/Actions";


const DetailCart = ({ item }) => {

    const { state, dispatch } = useContext(DataContext)
    const { auth, orders } = state;

    const handleDeliver = async (id, order) => {
        try {
            dispatch({ type: "NOTIFY", payload: { loading: true } });
            const res = await postData("admin/deliver", { id });
            dispatch(updateItem(orders, id, {
                ...order, delivered: res.isDeliver
            }, "ADD_ORDERS"))
            dispatch({ type: "NOTIFY", payload: { loading: false } })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="border-2 my-2 rounded p-4 space-y-3">
            <div className="flex justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h1 className="mr-4">شماره پیگیری :</h1>
                <span className="mr-4">{item.code}</span>
            </div>
            <div className="flex justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h1 className="mr-4">تاریخ ثبت :</h1>
                <span className="mr-4">
                    {moment(item.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                </span>
            </div>
            <div className="flex justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h1 className="mr-4">آدرس ثبت شده :</h1>
                <span className="mr-4">{item.address}</span>
            </div>
            <div className="flex justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h1 className="mr-4">مبلغ پرداختی :</h1>
                <span className="mr-4">{item.total}</span>
            </div>
            <div className="flex justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h1 className="mr-4">وضعیت :</h1>
                <span className="mr-4">
                    {
                        item.delivered
                            ?
                            <span className='bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>ارسال شد</span>
                            :
                            <span className='bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>در حال پیگیری</span>
                    }
                </span>
            </div>
            <div className="flex justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h1 className="mr-4">پرداخت :</h1>
                <span className="mr-4">
                    {
                        item.paid
                            ?
                            <span className='bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>پرداخت شد</span>
                            :
                            <span className='bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>پرداخت نشد</span>
                    }
                </span>
            </div>
            <hr />
            <h1>سفارشات</h1>
            <div className="grid grid-cols-2 md:grid-cols-8 ">
                {
                    item.cart.map(i => (
                        <div key={i._id} className="cursor-pointer border-2 p-1 rounded">
                            <Link href={`/product/${i._id}`}>
                                <img className="h-48 rounded" src={i.images[0].url} />
                            </Link>
                        </div>
                    ))
                }
            </div>

            {
                auth.user.role === "admin"
                    ?
                    <div className="border-2 w-full p-2">
                        {
                            item.delivered
                                ?
                                <span onClick={() => handleDeliver(item._id, item)} className='cursor-pointer bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>ارسال شد</span>
                                :
                                <span onClick={() => handleDeliver(item._id, item)} className='cursor-pointer bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>در حال پیگیری</span>
                        }
                    </div>
                    :
                    null
            }
        </div>
    );
}

export default DetailCart;