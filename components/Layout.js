import NavBar from "./NavBar";
import Notify from "./Notify";


const Layout = ({ children }) => {
    return (
        <div className="max-w-6xl m-auto">
            <NavBar />
            <Notify />
            {children}
        </div>
    );
}

export default Layout;