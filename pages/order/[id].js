import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState"
import { useRouter } from "next/router";
import Link from "next/link";
import DetailCart from './../../components/detailCart';

const DetailOrder = () => {

    const { state, dispatch } = useContext(DataContext);
    const { orders, auth } = state;

    const router = useRouter();

    const [orderDetail, setOrderDetail] = useState([]);

    useEffect(() => {
        if (orders) {

            const newArr = orders.filter(order => order._id === router.query.id);
            setOrderDetail(newArr);
        }
    }, [orders])

    return (
        <div className="">
            <Head>
                <title>جزئیات سفارش</title>
            </Head>
            {
                orderDetail
                    ?
                    <div className="flex flex-col ">
                        <div className="p-4" dir="ltr">
                            <Link href="/profile">
                                <a className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded flex justify-center w-2/12">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                    </svg>
                                    <span className="ml-2"> بازگشت </span>
                                </a>
                            </Link>
                        </div>
                        {
                            orderDetail.map(i => (
                                <DetailCart item={i} key={i._id} />
                            ))
                        }
                    </div>
                    :
                    <p>در حال دریافت اطلاعات</p>
            }
            <div className="">

            </div>
        </div>
    );
}

export default DetailOrder;