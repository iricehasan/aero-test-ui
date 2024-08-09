'use client';

import { useChain } from '@cosmos-kit/react';
import { ToastError, ToastSuccess } from "@/components/alert/SweatAlert";
import React, {createContext, useContext,useEffect, useState} from 'react'
import { toBase64, toUtf8 } from "@cosmjs/encoding"
import { isAminoMsgSetWithdrawAddress } from '@cosmjs/stargate';
import { INJ_DENOM, USDT_DENOM, protocolAddress, oracleHelperAddress, cw20contractAddress} from './constants';

const UserContext = createContext({});

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("Context was used outside of its Provider!");
    }

    return context;
};

export const useContract = () => {
    const chainContext = useChain("injectivetestnet");

    const {
        status,
        getSigningCosmWasmClient,
        username,
        address,
        message,
        connect,
        disconnect,
        openView,
    } = chainContext;

    const [client, setClient] = useState<any>(null);

    useEffect(() => {
      const initClient = async () => {
          if (status === "Connected") {
              const cosmWasmClient = await getSigningCosmWasmClient();
              console.log("cosmWasmClient:", cosmWasmClient); // Log the client
              setClient(cosmWasmClient);
          }
      };
      initClient();
  }, [status, getSigningCosmWasmClient]);

    const getClient = async () => {
      try {
        return client;
      } catch (error) {
        console.log("Error:", error);
        return null;
      }
    };

    const signerAddress = address



    const getEmergencyDebtByAddress = async (address: string) => {
        try {
          const client = await getClient();
          if (!client) return null;
          const response: any = await client.queryContractSmart(protocolAddress, {
            emergency_user_debt: { address: isAminoMsgSetWithdrawAddress },
          });
          return response;
        } catch (error) {
          console.error("Error getting user debt:", error);
          return null;
        }
      };


    const setDataBatch = async() => {
      try {
        if (!client) return null;
          const res = await client.execute(
            signerAddress,
            oracleHelperAddress,
            {
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
          "auto", // fee
          "",
          []
        );
        ToastSuccess({
          tHashLink: res?.transactionHash,
        }).fire({ title: "Set Data Batch successful" });
        return res ? { transactionHash: res?.transactionHash } : false;
      } catch (error) {
        console.error("Error setting data batch:", error);
        ToastError.fire({ title: "Set Data Batch failed" });
        return false;
      }
    };

    const setPrice = async(denom: string, price: number) => {
      try {
        if (!client) return null;
          const res = await client.execute(
            signerAddress,
            oracleHelperAddress,
            {
              set_price: {
                  denom,
                  price,
              }
            },
          "auto", // fee
          "",
          []
        );
        ToastSuccess({
          tHashLink: res?.transactionHash,
        }).fire({ title: "Set Price successful" });
        return res ? { transactionHash: res?.transactionHash } : false;
      } catch (error) {
        console.error("Error setting price:", error);
        ToastError.fire({ title: "Set Price failed" });
        return false;
      }
    };

    const openTrove = async (loanAmount: string, denom: string, amount: string) => {
      try {
        if (!client) return null;
        const res = await client.execute(
          signerAddress,
          protocolAddress,
          {
            open_trove: {loan_amount: loanAmount},
          },
          "auto", // fee
          "",
          [{
            denom,
            amount,
          }]
        );
        ToastSuccess({
          tHashLink: res?.transactionHash,
        }).fire({ title: "Open Trove successful" });
        return res ? { transactionHash: res?.transactionHash } : false;
      } catch (error) {
        console.error("Error open trove:", error);
        ToastError.fire({ title: "Open Trove failed" });
        return false;
      }
  };


  const emergency = async () => {
    try {
      if (!client) return null;
      const res = await client.execute(
        signerAddress,
        protocolAddress,
        {
          emergency: {}
        },
        "auto", // fee
        "",
        []
      );
      ToastSuccess({
        tHashLink: res?.transactionHash,
      }).fire({ title: "Repay Loan successful" });
      return res ? { transactionHash: res?.transactionHash } : false;
    } catch (error) {
      console.error("Error repaying loan:", error);
      ToastError.fire({ title: "Repay Loan failed" });
      return false;
        }
    };

        const baseEmergencyRepayLoan = toBase64(toUtf8(JSON.stringify({
          emergency_repay_loan: {},
       })))


        const baseEmergencyRedeem = toBase64(toUtf8(JSON.stringify({
                emergency_redeem: {},
              })))

        const emergencyRedeem = async (amount: string) => {
            try {
              if (!client) return null;
              const res = await client.execute(
                signerAddress,
                cw20contractAddress,
                {
                  send: {
                    contract: protocolAddress, 
                    amount, 
                    msg: baseEmergencyRedeem}
                },
                "auto", // fee
                "",
                []
              );
              ToastSuccess({
                tHashLink: res?.transactionHash,
              }).fire({ title: "Redeem successful" });
              return res ? { transactionHash: res?.transactionHash } : false;
            } catch (error) {
              console.error("Error redeem:", error);
              ToastError.fire({ title: "Redeem failed" });
              return false;
                }
            };


            const emergencyRepayLoan = async (amount: string) => {
              try {
                if (!client) return null;
                const res = await client.execute(
                  signerAddress,
                  cw20contractAddress,
                  {
                    send: {
                      contract: protocolAddress, 
                      amount, 
                      msg: baseEmergencyRepayLoan}
                  },
                  "auto", // fee
                  "",
                  []
                );
                ToastSuccess({
                  tHashLink: res?.transactionHash,
                }).fire({ title: "Repay Loan successful" });
                return res ? { transactionHash: res?.transactionHash } : false;
              } catch (error) {
                console.error("Error repaying loan:", error);
                ToastError.fire({ title: "Repay Loan failed" });
                return false;
                  }
              };
    return ({
        connect,
        getSigningCosmWasmClient,
        disconnect,
        address,
        status,
        emergency,
        getEmergencyDebtByAddress,
        openTrove,
        setDataBatch,
        setPrice,
        emergencyRedeem,
        emergencyRepayLoan,
    })  
}

