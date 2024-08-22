// "use client"

import React from "react";
import {
  useActiveAccount,
  useSendTransaction,
  useReadContract
} from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contractVesting } from "../../utils/contract";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/* global BigInt */

function ModuleTwo() {
  // const account = useActiveAccount();
  // const { mutate: sendTransaction } = useSendTransaction();
  // const onClickFunction = (account) => {
  //   const transaction = prepareContractCall({
  //     contractVesting,
  //     method: "withDraw",
  //     params: [account?.address || ""]
  //   });
  //   sendTransaction(transaction);

  // }

  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  const onClickFunction = async () => {
    if (!account) {
      toast.error("No Wallet Connected");
    }
    

    try {
      const transaction = await prepareContractCall({
        contract: contractVesting,
        method: "withDraw",
        params: [account?.address || ""],
      });

      sendTransaction(transaction);
    } catch (error) {
      console.error("Error preparing or sending transaction:", error);
    }
  };

  const { data: userData } = useReadContract({
    contract: contractVesting,
    method: "employees",
    params: [account?.address || ""],
  });

  const { data: userAvailableTokens } = useReadContract({
    contract: contractVesting,
    method: "availableTokens",
    params: [account?.address || ""],
  });
  let employeeAddress,
    employeeName,
    employeeEmail,
    startTime,
    cliffDuration,
    totalDuration,
    totalTokens,
    receivedTokens,
    exists;

  if (Array.isArray(userData)) {
    // Destructure if it's an array or tuple
    [
      employeeAddress,
      employeeName,
      employeeEmail,
      startTime,
      cliffDuration,
      totalDuration,
      totalTokens,
      receivedTokens,
      exists,
    ] = userData;
  }

  const claimedError = ()=> toast.error("You have already claimed");
  const shouldWait = ()=> toast.error("You should wait");
  const connectWallet = ()=>       toast.error("No Wallet Connected");


  return (
    <>
      {/* <div className="mt-5 bg-gray-200 text-gray-800 p-8 w-full rounded-lg font-[sans-serif] max-w-screen-2xl mx-auto">
        <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
          <h1 className="text-xl font-extrabold">Available Tokens</h1>
          <p className="mt-1 text-sm text-gray-500">
            {userAvailableTokens ? String(userAvailableTokens) : "0"}
          </p>
        </div>

        <button
          type="button"
          className=" px-16 py-4 rounded-lg text-white text-lg tracking-wider border-none  outline-none bg-blue-600 hover:bg-blue-700"
          onClick={onClickFunction}
        >
          Claim Tokens
        </button>
      </div> */}

<div className="mt-5 bg-gray-200 text-gray-800 p-8 w-full rounded-lg font-[sans-serif] max-w-screen-2xl mx-auto flex flex-row justify-around">
  
  <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden">
    <h1 className="text-xl font-extrabold">Available Tokens</h1>
    <p className="mt-1 text-sm text-gray-500">
      {userAvailableTokens ? String(userAvailableTokens) : "0"}
    </p>
  </div>

  <button
    type="button"
    className="px-16 rounded-lg text-white font-bold text-lg tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 overflow-hidden"
    onClick={account ? (totalTokens != receivedTokens ? (totalTokens == userAvailableTokens ?  onClickFunction : shouldWait ) : claimedError) : connectWallet}
  >
    Claim Tokens
  </button>
  
</div>

    </>
  );
}

export default ModuleTwo;
