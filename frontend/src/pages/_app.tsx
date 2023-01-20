import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/layout/layout'
import { store } from 'redux/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout children={<Component {...pageProps} />} />
    </Provider>
  )
}

export default MyApp