import { useContext } from "react"
import { DataContext } from "../../../store/GlobalState"
import Head from "next/head"

import TableUser from './../../../components/adminDashboard.js/tableUser';



const Client = () => {

    const { state, dispatch } = useContext(DataContext);
    const { users } = state;

    if (!users) return <p>در حال دریافت اطلاعات</p>
    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Head>
                <title>کاربران</title>
            </Head>
            <table className="w-full text-sm text-right text-gray-500 overflow-scroll">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                           نام کاربری
                        </th>
                        <th scope="col" className="px-6 py-3">
                            شماره تماس
                        </th>
                        <th scope="col" className="px-6 py-3">
                            پست الکترونیک
                        </th>
                        <th scope="col" className="px-6 py-3">
                            تاریخ
                        </th>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(i => (
                            <TableUser user={i} key={i._id} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

Client.layout = "L2";

export default Client;