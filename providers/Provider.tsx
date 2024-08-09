"use client";

import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { wallets as keplr } from "@cosmos-kit/keplr";
import ConnectButton from "../components/ConnectButton"
import { FC, PropsWithChildren } from "react";
import { GasPrice } from "@cosmjs/stargate";

const Provider:FC<PropsWithChildren> = ({ children }) => {

  return (
    <ChainProvider
      chains={chains}
      assetLists={assets}
      wallets={[keplr[0]]}
      endpointOptions={{
        endpoints: {
          sei: {
            rpc: ['https://sei-rpc.lavenderfive.com:443']
          },
        }
      }}
      signerOptions={{
        signingCosmwasm: () => {
          return {
            gasPrice: GasPrice.fromString("0.025sei")
          }
        },
        preferredSignType: () => {
          return 'amino';
        }
      }}
    >
      {children}
    </ChainProvider >
  );
};

export default Provider;
