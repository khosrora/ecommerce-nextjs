import { useContext } from "react";
import { DataContext } from "../store/GlobalState"
import { decrease, increase, deleteItem } from "../store/Actions";



const CartItem = ({ item, dispatch, cart }) => {


    return (
        <tr>
            <td>
                <div className="flex justify-center">
                    <img
                        src={item.images[0].url}
                        className="object-cover h-28 w-28 rounded-2xl"
                        alt="image"
                    />
                </div>
            </td>
            <td className="p-4 px-6 text-center whitespace-nowrap">
                <div className="flex flex-col items-center justify-center">
                    <h3>{item.title}</h3>
                </div>
            </td>
            <td className="p-4 px-6 text-center whitespace-nowrap">
                <div>
                    <button onClick={() => dispatch(decrease(cart, item._id))} disabled={item.quantity === 0 ? true : false}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-flex w-6 h-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path

                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increase(cart, item._id))} disabled={item.quantity === item.inStock ? true : false}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-flex w-6 h-6 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path

                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>
            </td>
            <td className="p-4 px-6 text-center whitespace-nowrap">{item.price * item.quantity}</td>
            <td className="p-4 px-6 text-center whitespace-nowrap">
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-red-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path

                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </td>
        </tr >
    );
}

export default CartItem;