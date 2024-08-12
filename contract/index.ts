'use client';

import { ToastError, ToastSuccess } from "@/components/alert/SweatAlert";
import React, {createContext, useContext,useEffect, useState} from 'react'
import { INJ_DENOM, USDT_DENOM, protocolAddress, oracleHelperAddress, cw20contractAddress} from './constants';
import { ChainGrpcWasmApi, MsgExecuteContractCompat,
  fromBase64,
  toBase64, toUtf8 } from "@injectivelabs/sdk-ts";
import { Network, getNetworkEndpoints } from "@injectivelabs/networks";
import { WalletStrategy, Wallet, MsgBroadcaster } from "@injectivelabs/wallet-ts";
import { Web3Exception } from "@injectivelabs/exceptions";
import { ChainId } from "@injectivelabs/ts-types";
import { useChain } from '@cosmos-kit/react';

const NETWORK = Network.Testnet;
const ENDPOINTS = getNetworkEndpoints(NETWORK);

const chainGrpcWasmApi = new ChainGrpcWasmApi(ENDPOINTS.grpc);

const walletStrategy = new WalletStrategy({
  chainId: ChainId.Testnet,
  wallet: Wallet.Keplr,
});

export const msgBroadcastClient = new MsgBroadcaster({
  walletStrategy,
  network: NETWORK,
}) 

export const getAddresses = async (): Promise<string[]> => {
  const addresses = await walletStrategy.getAddresses();

  if (addresses.length === 0) {
    throw new Web3Exception(
      new Error("There are no addresses linked in this wallet.")
    );
  }

  return addresses;
};

export const useContract = () => {

  const chainContext = useChain("injectivetestnet");

  const {
    status,
    connect,
    disconnect,
} = chainContext;

const [address, setAddress] = useState<string>("")

const getAddress = async () => {
  try {
    const addresses = await getAddresses()
    setAddress(addresses[0])
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  const initClient = async () => {
      if (status === "Connected") {
          getAddress()
          console.log("status:", status); // Log the client
      }
  };
  initClient();
}, [status]);

  const injectiveAddress = address


    const getEmergencyDebtByAddress = async (address: string) => {
        try {
          const response: any = (await chainGrpcWasmApi.fetchSmartContractState(
            protocolAddress,
            toBase64({
              emergency_user_debt: { user_addr: address },
            })
          ));

          const debt = fromBase64(response.data);
  
          return debt;
        } catch (error) {
          console.error("Error getting user debt:", error);
          return null;
        }
      };


    const setDataBatch = async() => {
      try {
        const msg = MsgExecuteContractCompat.fromJSON({
          contractAddress: oracleHelperAddress,
          sender: injectiveAddress,
          msg: {
            set_data_batch: {
              data: [ {
          
                  "denom": INJ_DENOM,
                  "decimal": 18,
                  "price_id": "price1"
                },
                { 
                  "denom": USDT_DENOM,
                  "decimal": 6,
                  "price_id": "price2"
                }
              ]
            }
          },
        });
  
        const res = await msgBroadcastClient.broadcast({
          msgs: msg,
          injectiveAddress: injectiveAddress,
        });

        ToastSuccess({
          tHashLink: res?.txHash,
        }).fire({ title: "Set Data Batch successful" });
        return res ? { transactionHash: res?.txHash } : false;
      } catch (error) {
        console.error("Error setting data batch:", error);
        ToastError.fire({ title: "Set Data Batch failed" });
        return false;
      }
    };

    const setPrice = async(denom: string, price: number) => {
      try {
        const msg = MsgExecuteContractCompat.fromJSON({
          contractAddress: oracleHelperAddress,
          sender: injectiveAddress,
          msg:   {
            set_price: {
                denom,
                price,
            }
          },
        });
  
        const res = await msgBroadcastClient.broadcast({
          msgs: msg,
          injectiveAddress: injectiveAddress,
        });

        ToastSuccess({
          tHashLink: res?.txHash,
        }).fire({ title: "Set Price successful" });
        return res ? { transactionHash: res?.txHash } : false;
      } catch (error) {
        console.error("Error setting price:", error);
        ToastError.fire({ title: "Set Price failed" });
        return false;
      }
    };

    const openTrove = async (loanAmount: string, denom: string, amount: string) => {
      try {
        const msg = MsgExecuteContractCompat.fromJSON({
          contractAddress: protocolAddress,
          sender: injectiveAddress,
          msg: {
            open_trove: {loan_amount: loanAmount},
          },
          funds:   [{
            denom,
            amount,
          }]
        });
  
        const res = await msgBroadcastClient.broadcast({
          msgs: msg,
          injectiveAddress: injectiveAddress,
        });

        ToastSuccess({
          tHashLink: res?.txHash,
        }).fire({ title: "Open Trove successful" });
        return res ? { transactionHash: res?.txHash } : false;
      } catch (error) {
        console.error("Error open trove:", error);
        ToastError.fire({ title: "Open Trove failed" });
        return false;
      }
  };


  const emergency = async () => {
    try {
      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: protocolAddress,
        sender: injectiveAddress,
        msg: {
          emergency: {}
        },
      });

      const res = await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: injectiveAddress,
      });

      ToastSuccess({
        tHashLink: res?.txHash,
      }).fire({ title: "Repay Loan successful" });
      return res ? { transactionHash: res?.txHash } : false;
    } catch (error) {
      console.error("Error repaying loan:", error);
      ToastError.fire({ title: "Repay Loan failed" });
      return false;
        }
    };

        const baseEmergencyRepayLoan = toBase64({
          emergency_repay_loan: {},
       })


        const baseEmergencyRedeem = toBase64({
                emergency_redeem: {},
              })

        const emergencyRedeem = async (amount: string) => {
            try {
              const msg = MsgExecuteContractCompat.fromJSON({
                contractAddress: cw20contractAddress,
                sender: injectiveAddress,
                msg: {
                  send: {
                    contract: protocolAddress, 
                    amount, 
                    msg: baseEmergencyRedeem}
                },
              });
        
              const res = await msgBroadcastClient.broadcast({
                msgs: msg,
                injectiveAddress: injectiveAddress,
              });

              ToastSuccess({
                tHashLink: res?.txHash,
              }).fire({ title: "Redeem successful" });
              return res ? { transactionHash: res?.txHash } : false;
            } catch (error) {
              console.error("Error redeem:", error);
              ToastError.fire({ title: "Redeem failed" });
              return false;
                }
            };

            const emergencyRepayLoan = async (amount: string) => {
              try {
                const msg = MsgExecuteContractCompat.fromJSON({
                  contractAddress: cw20contractAddress,
                  sender: injectiveAddress,
                  msg: {
                    send: {
                      contract: protocolAddress, 
                      amount, 
                      msg: baseEmergencyRepayLoan}
                  },
                });
          
                const res = await msgBroadcastClient.broadcast({
                  msgs: msg,
                  injectiveAddress: injectiveAddress,
                });

                ToastSuccess({
                  tHashLink: res?.txHash,
                }).fire({ title: "Repay Loan successful" });
                return res ? { transactionHash: res?.txHash } : false;
              } catch (error) {
                console.error("Error repaying loan:", error);
                ToastError.fire({ title: "Repay Loan failed" });
                return false;
                  }
              };

    return ({
      connect,
      disconnect,
      status,
        injectiveAddress,
        emergency,
        getEmergencyDebtByAddress,
        openTrove,
        setDataBatch,
        setPrice,
        emergencyRedeem,
        emergencyRepayLoan,
    })  
}

