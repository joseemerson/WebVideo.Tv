import Homecontextprovider from '../context/Homecontext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
     <Homecontextprovider>
     <Component {...pageProps} />
     </Homecontextprovider>
  )
}

export default MyApp
