import '../styles/globals.css'
import type { AppProps } from 'next/app'


import Layout from 'components/layout/layout'
import WalletProviderWrapper from 'components/wallet/wallet-provider-wrapper'

function MyApp({ Component, pageProps }: AppProps) {
  

  return (
    <>
      <WalletProviderWrapper children={<Layout children={<Component {...pageProps} />} />} />
    </>
    
  )
}

export default MyApp