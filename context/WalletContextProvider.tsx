import { getAddresses } from "@/services/wallet";
import { getInjectiveAddress } from "@injectivelabs/sdk-ts";
import React, { createContext, useContext, useEffect, useState } from "react";

type StoreState = {
  injectiveAddress: string;
  connectWallet: () => void;
};

const WalletContext = createContext<StoreState>({
  injectiveAddress: "",
  connectWallet: () => {},
});

export const useWalletStore = () => useContext(WalletContext);

type Props = {
  children?: React.ReactNode;
};

const WalletContextProvider = (props: Props) => {
  const [injectiveAddress, setInjectiveAddress] = useState("");

  async function connectWallet() {
    const [address] = await getAddresses();
    setInjectiveAddress(address);
  }

  return (
    <WalletContext.Provider
      value={{
        injectiveAddress,
        connectWallet,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
