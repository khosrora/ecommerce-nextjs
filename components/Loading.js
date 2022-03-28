



const Loading = () => {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 opacity-75 z-50">
            <div className="text-white h-full flex justify-center items-center gap-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="animate-bounce h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <h6>در حال دریافت اطلاعات</h6>
            </div>
        </div >
    );
}

export default Loading;