import moment from 'jalali-moment'
import { updateItem } from '../../store/Actions';
import { postData } from "../../utils/fetchData"
import { useContext } from 'react';
import { DataContext } from './../../store/GlobalState';
import swal from 'sweetalert';


const TableUser = ({ user }) => {

    const { state, dispatch } = useContext(DataContext)
    const { users } = state;

    const changeRole = async (id, user) => {
        swal({
            title: "از این عملیات مطمئنی؟",
            icon: "warning",
            buttons: ["نه بیخیال", "آره"],
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    try {
                        dispatch({ type: "NOTIFY", payload: { loading: true } });
                        const res = await postData("admin/users/isAdmin", { id });
                        dispatch(updateItem(users, id, {
                            ...user, role: res.role
                        }, "ADD_USERS"));
                        dispatch({ type: "NOTIFY", payload: { loading: false } });
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    swal("عملیات متوقف شد", {
                        buttons: "باشه دیگه !!",
                        dangerMode: true,
                        icon: "warning",
                    });
                }
            });

    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">
                {user.name}
            </td>
            <td className="px-6 py-4">
                {user.phoneNumber}
            </td>
            <td className="px-6 py-4">
                {user.email}
            </td>
            <td className="px-6 py-4">
                {moment(user.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
            </td>
            <td className="px-6 py-4">
                {
                    user.role === "user"
                        ?
                        <span onClick={() => changeRole(user._id, user)} className='bg-slate-100 text-slate-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded cursor-pointer'>کاربر</span>
                        :
                        <span onClick={() => changeRole(user._id, user)} className='bg-slate-100 text-slate-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded cursor-pointer'>مدیر</span>
                }
            </td>
        </tr>
    );
}

export default TableUser;