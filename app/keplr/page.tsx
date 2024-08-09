"use client"

import { Web3Exception } from "@injectivelabs/exceptions"
import { ChainId } from "@injectivelabs/ts-types"
import { WalletStrategy } from "@injectivelabs/wallet-ts"
import React, { useState } from "react"

const walletStrategy = new WalletStrategy({
  chainId: ChainId.Testnet,
  ethereumOptions: undefined,
})

const getAddresses = async (): Promise<string[]> => {
  const addresses = await walletStrategy.getAddresses()

  if (addresses.length === 0) {
    throw new Web3Exception(
      new Error("There are no addresses linked in this wallet.")
    )
  }

  return addresses
}

const KeplrPage = () => {
  const [address, setAddress] = useState<string>("")

  const getAddress = async () => {
    try {
      const addresses = await getAddresses()
      setAddress(addresses[0])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Keplr Page</h1>
      <p className="mb-4">
        This is a boilerplate React component for the Keplr page.
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={getAddress}
      >
        Get Address {address}
      </button>
    </div>
  )
}

export default KeplrPage
