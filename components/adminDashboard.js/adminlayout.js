import SideBar from './sideBar';
import NavBar from './../NavBar';
import Notify from './../Notify';



const AdminLayout = ({ children }) => {
    return (
        <div className="">
            <NavBar />
            <Notify />
            <section className="flex flex-col text-slate-500 mt-4 gap-x-2 md:flex-row">
                <div className=" basis-1/4 text-center">
                    <div className="flex flex-col justify-center items-center border rounded p-4">
                        <SideBar />
                    </div>
                </div>
                <div className="border rounded p-4 basis-3/4">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {children}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AdminLayout;