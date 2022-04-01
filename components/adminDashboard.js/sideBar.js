import Link from "next/link"



const SideBar = () => {
    return (
        <ul className="space-y-4">
            <li>
                <Link href="/">بازگشت به وب سایت</Link>
            </li>
            <li>
                <Link href="/admin/dashboard">داشبورد</Link>
            </li>
            <li>
                <Link href="/admin/client">کاربران</Link>
            </li>
            <li>
                <Link href="/admin/categories">دسته بندی ها</Link>
            </li>
        </ul>
    );
}

export default SideBar;