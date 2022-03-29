import moment from 'jalali-moment'
import Link from "next/link"


const Order = ({ order }) => {
    console.log(order)
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {order.code}
            </th>
            <td className="px-6 py-4">
                {order.total}
            </td>
            <td className="px-6 py-4">
                {
                    order.delivered
                        ?
                        <span className='bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>ارسال شد</span>
                        :
                        <span className='bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>در حال پیگیری</span>
                }
            </td>
            <td className="px-6 py-4">
                {moment(order.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
            </td>
            <td className="px-6 py-4">
            {
                    order.paid
                        ?
                        <span className='bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>پرداخت شد</span>
                        :
                        <span className='bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>پرداخت نشد</span>
                }
            </td>
            <td className="px-6 py-4 text-right">
                <Link href={`/order/${order._id}`}>
                    مشاهده جزئیات
                </Link>
            </td>
        </tr>
    );
}

export default Order;