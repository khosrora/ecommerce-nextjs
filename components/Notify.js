import { useContext } from "react";
import { DataContext } from './../store/GlobalState';
import Loading from "./Loading";
import Toast from "./Toast";



const Notify = () => {

    const [state, dispatch] = useContext(DataContext)
    const { notify } = state;

    return (
        <>
            {notify.loading && <Loading />}
            {notify.error && <Toast msg={notify.error} bgColor="bg-red-600" />}
            {notify.success && <Toast msg={notify.success} bgColor="bg-green-600" />}
        </>
    );
}

export default Notify;