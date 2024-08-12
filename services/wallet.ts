import { WalletStrategy, Wallet } from "@injectivelabs/wallet-ts";
import { Web3Exception } from "@injectivelabs/exceptions";
import { ChainId } from "@injectivelabs/ts-types";

export const walletStrategy = new WalletStrategy({
  chainId: ChainId.Testnet,
  wallet: Wallet.Keplr,
});

export const getAddresses = async (): Promise<string[]> => {
  // walletStrategy.setWallet(Wallet.Keplr)
  const addresses = await walletStrategy.getAddresses();

  if (addresses.length === 0) {
    throw new Web3Exception(
      new Error("There are no addresses linked in this wallet.")
    );
  }

  return addresses;
};
