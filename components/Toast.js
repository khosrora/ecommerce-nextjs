



const Toast = ({ msg, handleShow, bgColor }) => {
    return (
        <div className={`flex items-center ${bgColor} border-l-4  py-2 px-3 shadow-md mb-2 max-w-xl m-auto mt-2`} >
            <div className={`${bgColor} rounded-full bg-white mr-3`}>
                <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                    <path d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                </svg>
            </div>
            <div className="text-white max-w-xs ">
                {msg}
            </div>
        </div>
    )
}

export default Toast;