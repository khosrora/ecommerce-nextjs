import Link from "next/link"



const Error = ({ data }) => {
    if (!data) return <p>در حال دریافت اطلاعات</p>
    return (
        <div className="w-full md:w-2/3 mx-auto mt-4">
            <div className="flex p-5 rounded-lg shadow bg-white">
                <div>
                    <svg className="w-6 h-6 fill-current text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" /></svg>
                </div>
                <div className="ml-3">
                    <h2 className="font-semibold text-gray-800">{data.msg}</h2>
                    <div className="mt-8">
                        <p className="mt-2 text-sm text-red-600 leading-relaxed">متاسفانه پرداخت با مشکل مواجه شد</p>
                        <Link href="/cart"><a className="text-red-600">دوباره امتحان کن !!</a></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;