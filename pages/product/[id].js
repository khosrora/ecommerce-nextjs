import { useState, useContext } from "react";
import Head from "next/head";
import { getData } from "./../../utils/fetchData"
import { DataContext } from "../../store/GlobalState"
import { addToCart } from "../../store/Actions"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";


const DetailProduct = ({ props }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [detailProduct] = useState(props.product)

    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;


    return (
        <div>
            <Head>
                <title>صفحه تک محصول {detailProduct.title}</title>
            </Head>
            <div className="flex flex-col justify-around items-center mt-4 gap-x-2 w-full gap-y-4 md:flex-row ">
                <div className="px-4 w-screen md:w-1/2 rounded">
                    <Swiper
                        style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                        }}
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                    >
                        {
                            detailProduct.images.map(i => (
                                <>
                                    <SwiperSlide key={i._id}>
                                        <img className="h-54 w-full md:h-96" src={i.url} />
                                    </SwiperSlide>
                                </>
                            ))
                        }

                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        {
                            detailProduct.images.map(i => (
                                <>
                                    <SwiperSlide>
                                        <img className="cursor-pointer h-14 w-full md:h-24" src={i.url} />
                                    </SwiperSlide>
                                </>
                            ))
                        }
                    </Swiper>
                </div>
                <div className="px-8 w-full md:w-1/2 space-y-4">
                    <h1>
                        عنوان : <br />
                        {detailProduct.title}
                    </h1>
                    <p>قیمت : <span>{detailProduct.price}</span></p>
                    {
                        detailProduct.inStock > 0
                            ?
                            <p>تعداد {detailProduct.inStock} در انبار</p>
                            :
                            <p>اتمام موجودی</p>
                    }
                    <p></p>
                    <hr />
                    <p>
                        توضیحات : <br />
                        {detailProduct.description}
                    </p>
                    <hr />
                    <p>
                        توضیحات کامل : <br />
                        {detailProduct.content}
                    </p>

                    <button onClick={() => dispatch(addToCart(detailProduct , cart))} disabled={detailProduct.inStock === 0 ? true : false} className="inline-flex items-center py-2 px-12 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                        خرید
                    </button>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const id = params.id;
    const res = await getData(`product/${id}`)
    // ! server side rendering
    return {
        props: {
            props: { product: res.product }
        }, // will be passed to the page component as props
    }
}

export default DetailProduct;