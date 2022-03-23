import { useState } from "react"
import { getData } from "../utils/fetchData"
import Head from "next/head"
import ProductItem from './../components/product/productItem';

const Home = (props) => {

  const [products, setProducts] = useState(props.productsProps);



  return (
    <div className="">
      <Head>
        <title>صفحه اصلی</title>
      </Head>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 m-auto my-4 ">
        {
          products.length === 0
            ?
            <h2>هنوز محصولی ثبت نشده است</h2>
            :
            products.map(product => (
              <ProductItem key={product._id} product={product} />
            ))
        }
      </div>
    </div>
  );
}

export async function getServerSideProps() {

  const res = await getData("product")
  // ! server side rendering
  return {
    props: {
      productsProps: res.products,
      result: res.result
    }, // will be passed to the page component as props
  }
}

export default Home;