import { GasPrice } from "@cosmjs/stargate";
import { Decimal } from "@cosmjs/math";
import { WalletProvider } from '@cosmos-kit/react'
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { Chain } from "@chain-registry/types";
import { assets, chains } from "chain-registry";

interface props {
  children: React.ReactNode
}

const WalletProviderWrapper = ({ children }: props) => {
  const secretChain = chains.filter(chain => chain.chain_name == process.env.NEXT_PUBLIC_CHAIN_ID);
  const secretAsset = assets.filter(asset => asset.chain_name == process.env.NEXT_PUBLIC_CHAIN_ID);
  
  return (
    <WalletProvider
      chains={secretChain}
      assetLists={secretAsset}
      wallets={[
        ...keplrWallets,
        ...cosmostationWallets,
        ...leapWallets,
      ]}
      signerOptions={{
        signingStargate: (chain: Chain) => {
          return {
            gasPrice: new GasPrice(Decimal.zero(1), process.env.NEXT_PUBLIC_GAS_DENOM ?? "uscrt"),
          };
        },
        signingCosmwasm: (chain: Chain) => undefined,
      }}
      endpointOptions={{
        pulsar: {
          rpc: ["https://rpc.pulsar.scrttestnet.com", "https://rpc.testnet.secretsaturn.net"],
        },
        secretnetwork: {
          rpc: ["https://rpc.secret.express", "https://secret-4.api.trivium.network:26657", "https://rpc.spartanapi.dev", 
                "https://rpc.secret.forbole.com/", "https://secret.rpc.consensus.one"]
        }
      }}
      >
      {children}
    </WalletProvider>
  )
}

export default WalletProviderWrapper;