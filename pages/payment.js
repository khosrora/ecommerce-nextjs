import { useEffect, useState } from "react"
import Error from "../components/verify/error"
import Succsed from "../components/verify/succsed"
import { postData } from "../utils/fetchData"


const Payment = ({ verifyUrl }) => {

    console.log(verifyUrl)
    const [data, setData] = useState()

    useEffect(() => {
        const verify = async () => {
            const res = await postData("order/verify", verifyUrl);
            console.log(res);
            setData(res)
        }
        verify()
    }, [])


    const renderPage = () => {
        if (verifyUrl.Status === "OK") {
            return <Succsed data={data} />
        } else {
            return <Error data={data} />
        }
    }


    return (
        <div className="">
            {renderPage()}
        </div>
    );
}


export async function getServerSideProps(context) {
    const { query } = context;
    const data = query;
    return {
        props: {
            verifyUrl: data,
        }
    }
}

Payment.layout = "L1";

export default Payment;