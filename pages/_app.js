import Layout from '../components/Layout'
import AdminLayout from '../components/adminDashboard.js/adminlayout'
import '../styles/globals.css'
import { DataProvider } from "../store/GlobalState"

const layouts = {
  L1: Layout,
  L2: AdminLayout,
};

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  )
}

export default MyApp
