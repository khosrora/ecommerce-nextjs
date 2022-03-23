import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

const ProductItem = ({ product }) => {

    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;

    const userLink = () => {
        return (
            <div className="flex items-center justify-around gap-x-2">
                <Link href={`product/${product._id}`}>
                    <a className="inline-flex items-center py-2 px-2 w-1/2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">مشاهده</a>
                </Link>
                <button disabled={product.inStock === 0 ? true : false} onClick={() => dispatch(addToCart(product, cart))} className="inline-flex items-center py-2 px-2 w-1/2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                    خرید
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 ">
            <img className="rounded-t-lg h-44 w-full" src={product.images[0].url} alt={product.title} />
            <div className="p-5">
                <a href="#">
                    <h6 className="mb-2  font-bold tracking-tight text-gray-900 " title={product.title}>{product.title}</h6>
                </a>
                <div className="flex items-center justify-start gap-x-8 font-normal">
                    <p className="mb-3 text-gray-700 " title={product.price}>
                        {product.price} <span>تومان</span>
                    </p>
                    <p className="mb-3 text-gray-700 " title={product.inStock}>
                        {
                            product.inStock > 0
                                ?
                                <p>
                                    {product.inStock}
                                    <span> عدد مانده</span>
                                </p>
                                :
                                <p>اتمام موجودی</p>
                        }
                    </p>
                </div>

                <p className="mb-3 text-sm text-gray-700 " title={product.description}>
                    {
                        product.description.length < 57
                            ? `${product.description}`
                            : `${product.description.substring(0, 57)}...`
                    }
                </p>
                <div className="">
                    {userLink()}
                </div>
            </div>
        </div >
    );
}

export default ProductItem;