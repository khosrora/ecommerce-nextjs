import Head from "next/head";
import { useContext, useState } from "react";
import { postData, putData, deleteData } from "../../../utils/fetchData";
import { DataContext } from "./../../../store/GlobalState"
import { updateItem, deleteItem } from "./../../../store/Actions"



const Categories = () => {

    const [name, setName] = useState("");

    const { state, dispatch } = useContext(DataContext);
    const { auth, categories } = state;

    const [id, setId] = useState();

    const createCategory = async (e) => {
        e.preventDefault();
        try {
            if (auth.user.role !== "admin") return dispatch({ type: "NOTIFY", error: { err: "Authenticated is not valid." } })
            if (!name) return dispatch({ type: "NOTIFY", payload: { error: "لطفا نام دسته بندی را وارد کنید" } })
            dispatch({ type: "NOTIFY", payload: { loading: true } });
            let res;
            if (id) {
                res = await putData(`/admin/categories/${id}`, { name }, auth.token);
                if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } })
                dispatch(updateItem(categories, id, res.category, "ADD_CATEGORIES"))
            } else {
                res = await postData("/admin/categories", { name }, auth.token);
                if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } })
                dispatch({ type: "ADD_CATEGORIES", payload: [...categories, res.newCategory] })
            }

            setName("")
            setId("")
            return dispatch({ type: "NOTIFY", payload: { success: res.msg } })

        } catch (err) {
            console.log(err.message);
        }
    }

    const handleEditCategory = (category) => {
        setId(category._id);
        setName(category.name);
    }

    const handleDeleteCategory = async (id) => {
        try {
            dispatch({ type: "NOTIFY", payload: { loading: true } });
            const res = await deleteData(`/admin/categories/${id}`);
            dispatch({ type: "NOTIFY", payload: { success: res.msg } });
            dispatch(deleteItem(categories , id , "ADD_CATEGORIES"));
            return dispatch({ type: "NOTIFY", payload: { loading: false } });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="mx-4 p-4 ">
            <Head>
                <title>دسته بندی ها</title>
            </Head>

            <div className="mx-auto p-4 border-2 rounded">
                <form className="mb-4 space-y-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        {
                            id ? "ویرایش" : "دسته بندی جدید"
                        }
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" value={name} onChange={e => setName(e.target.value)} type="text" />
                    <button onClick={createCategory} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        {
                            id ? "ویرایش" : "ثبت دسته بندی جدید"
                        }
                    </button>
                </form>
                <hr />
                <div className="grid grid-cols-2 gap-2 mt-6">
                    {
                        categories.map(i => (
                            <div className="border-2 rounded p-4 flex justify-between" key={i._id}>
                                <h1>{i.name}</h1>
                                <div className="flex justify-between items-center">
                                    <svg onClick={() => handleDeleteCategory(i._id)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <svg onClick={() => handleEditCategory(i)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

Categories.layout = "L2"

export default Categories;