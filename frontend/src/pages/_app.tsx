import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/layout/layout'
import { WalletProvider } from 'contexts/wallet-context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <Layout children={<Component {...pageProps} />} />
    </WalletProvider>
  )
}

export default MyApp