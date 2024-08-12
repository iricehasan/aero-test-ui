'use client';

import { useContract } from '@/contract';
import React, { useState } from 'react';

const ConnectButton = () => {
    const { 
        connect,
        disconnect,
        status,
        injectiveAddress,
        getEmergencyDebtByAddress,
        setDataBatch,
        openTrove,
        setPrice,
        emergencyRepayLoan,
        emergency,
        emergencyRedeem } = useContract();

    // States for each input field
    const [emergencyDebtAddress, setEmergencyDebtAddress] = useState('');

    const [emergencyPriceDenom, setEmergencyPriceDenom] = useState('');
    const [emergencyPriceAmount, setEmergencyPriceAmount] = useState(0);

    const [emergencyOpenTroveDenom, setEmergencyOpenTroveDenom] = useState('');
    const [emergencyOpenTroveLoanAmount, setEmergencyOpenTroveLoanAmount] = useState('');
    const [emergencyOpenTroveAmount, setEmergencyOpenTroveAmount] = useState('');

    const [emergencyRepayLoanAmount, setEmergencyRepayLoanAmount] = useState('');
    const [emergencyRedeemAmount, setEmergencyRedeemAmount] = useState('');

    async function OpenTrove() {
        if (!injectiveAddress) {
            console.log("Address is undefined");
            return;
        }
        try {
            let res = await openTrove(emergencyOpenTroveLoanAmount, emergencyOpenTroveDenom, emergencyOpenTroveAmount);
            console.log("res", res);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function SetDataBatch() {
        try {
            let res = await setDataBatch();
            console.log("res", res);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function SetPrice() {
        if (!address) {
            console.log("Address is undefined");
            return;
        }
        try {
            let res = await setPrice(emergencyPriceDenom, emergencyPriceAmount);
            console.log("res", res);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function getEmergencyUserDebt() {
        try {
            let res = await getEmergencyDebtByAddress(emergencyDebtAddress);
            console.log("res", res);
        } catch (error) {
            console.log("error", error);
        }
    }


    async function Emergency() {
        try {
            let res = await emergency();
            console.log("res", res);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function EmergencyRepayLoan() {
        if (!address) {
            console.log("Address is undefined");
            return;
        }
        try {
            let res = await emergencyRepayLoan(emergencyRepayLoanAmount);
            console.log("res", res);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function EmergencyRedeem() {
        if (!injectiveAddress) {
            console.log("Address is undefined");
            return;
        }
        try {
            let res = await emergencyRedeem(emergencyRedeemAmount);
            console.log("res", res);
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <>
            <div className='absolute top-20'>
                {status === "Connected" && <div className='flex flex-col'>
                    <span style={{ color: "palegreen", fontSize: "16px", marginBottom: "24px" }}>Address: {injectiveAddress}</span>


                    {/* Group 1: SetDataBatch */}
                    <div className="mb-6">
                        <span style={{ color: "palegreen", fontSize: "16px", marginBottom: "24px" }}>Set Data Batch:</span>
                        <div className="mb-4">
                            <button onClick={SetDataBatch}
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 h-12 text-center mb-2">
                                Set Data Batch
                            </button>
                        </div>
                    </div>

                    {/* Group 2: Emergency Set Price */}
                    <div className="mb-6">
                        <span style={{ color: "palegreen", fontSize: "16px", marginBottom: "24px" }}>SetPrice:</span>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Denom"
                                value={emergencyPriceDenom}
                                onChange={(e) => setEmergencyPriceDenom(e.target.value)}
                                className="mb-2 p-2 rounded border border-gray-300 text-black"
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                value={emergencyPriceAmount}
                                onChange={(e) => setEmergencyPriceAmount(Number(e.target.value))}
                                className="mb-2 p-2 rounded border border-gray-300 text-black"
                            />
                            <button onClick={SetPrice}
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 h-12 text-center mb-2">
                                Emergency Set Price
                            </button>
                        </div>
                    </div>

                        {/* Group 3: Open Trove */}
                        <div className="mb-6">
                        <span style={{ color: "palegreen", fontSize: "16px", marginBottom: "24px" }}>Open Trove:</span>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Loan Amount"
                                value={emergencyOpenTroveLoanAmount}
                                onChange={(e) => setEmergencyOpenTroveLoanAmount(e.target.value)}
                                className="mb-2 p-2 rounded border border-gray-300 text-black"
                            />
                            <input
                                type="text"
                                placeholder="Denom"
                                value={emergencyOpenTroveDenom}
                                onChange={(e) => setEmergencyOpenTroveDenom(e.target.value)}
                                className="mb-2 p-2 rounded border border-gray-300 text-black"
                            />
                            <input
                                type="text"
                                placeholder="Amount"
                                value={emergencyOpenTroveAmount}
                                onChange={(e) => setEmergencyOpenTroveAmount(e.target.value)}
                                className="mb-2 p-2 rounded border border-gray-300 text-black"
                            />
                            <button onClick={OpenTrove}
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 h-12 text-center mb-2">
                                Open Trove
                            </button>
                        </div>
                    </div>

                    {/* Group 7: Emergency */}
                    <div className="mb-6">
                        <span style={{ color: "palegreen", fontSize: "16px", marginBottom: "24px" }}>Emergency:</span>
                        <div className="mb-4">
                            <button onClick={Emergency}
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 h-12 text-center mb-2">
                                Emergency
                            </button>
                        </div>
                    </div>

                    {/* Group 7: Emergency User Debt */}
                    <div className="mb-6">
                        <span style={{ color: "palegreen", fontSize: "16px", marginBottom: "24px" }}>Emergency User Debt:</span>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Address"
                                value={emergencyDebtAddress}
                                onChange={(e) => setEmergencyDebtAddress(e.target.value)}
                                className="mb-2 p-2 rounded border border-gray-300 text-black"
                            />
                            <button onClick={getEmergencyUserDebt}
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 h-12 text-center mb-2">
                                Emergency User Debt
                            </button>
                        </div>
                    </div>

                    {/* Group 4: Emergency Repay Loan */}
                    <div className="mb-6">
                        <span style={{ color: "palegreen", fontSize: "16px", marginBottom: "24px" }}>Emergency Repay Loan:</span>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Emergency Repay Loan Amount"
                                value={emergencyRepayLoanAmount}
                                onChange={(e) => setEmergencyRepayLoanAmount(e.target.value)}
                                className="mb-2 p-2 rounded border border-gray-300 text-black"
                            />
                            <button onClick={EmergencyRepayLoan}
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 h-12 text-center mb-2">
                                Emergency Repay Loan
                            </button>
                        </div>
                    </div>

                    {/* Group 5: Emergency Redeem */}
                    <div className="mb-6">
                        <span style={{ color: "palegreen", fontSize: "16px", marginBottom: "24px" }}>Emergency Redeem:</span>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Emergency Redeem Amount"
                                value={emergencyRedeemAmount}
                                onChange={(e) => setEmergencyRedeemAmount(e.target.value)}
                                className="mb-2 p-2 rounded border border-gray-300 text-black"
                            />
                            <button onClick={EmergencyRedeem}
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 h-12 text-center mb-2">
                                Emergency Redeem
                            </button>
                        </div>
                    </div>
                    <button onClick={() => { disconnect(); }} className="gradient-button">Disconnect</button>
                </div>}
            </div>
            <div>
                    {status !== "Connected" && <button onClick={connect} className="gradient-button">Connect Wallet</button>}
            </div>

        </>
    );
}

export default ConnectButton;
