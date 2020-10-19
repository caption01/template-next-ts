import { AppContext, AppInitialProps } from 'next/app'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppContext & AppInitialProps) => {
  return <Component {...pageProps} />
}

export default MyApp
