"use client"

import React from 'react'
import {
    useActiveAccount,
    useContractEvents,
    useReadContract,
  } from "thirdweb/react";
  import { contractVesting } from "../../utils/contract";
  import contractABI from "../../utils/contractABI.json";
  

function ModuleOne() {
    const account = useActiveAccount();
    const { data:userData, isLoading: loadingUserName } = useReadContract({
      contract: contractVesting,
      method: "employees",
      params: [ account?.address || ""]
    });
  
    let employeeAddress, employeeName, employeeEmail, startTime, cliffDuration, totalDuration, totalTokens, receivedTokens, exists;
  
  
    if (Array.isArray(userData)) {
      // Destructure if it's an array or tuple
      [employeeAddress, employeeName, employeeEmail, startTime, cliffDuration, totalDuration, totalTokens, receivedTokens, exists] = userData;
    }


  return (
   <> <div className="mt-5 bg-gray-50 text-gray-800 p-8 w-full rounded-lg font-[sans-serif] max-w-screen-2xl mx-auto">
   
   <div className="flex">
   <div
      className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
      <h3 className="text-gray-800 text-lg font-semibold">Total Token</h3>
      <p className="mt-1 text-sm text-gray-500">{account ? String(totalTokens) : " " }</p>

     
    </div>
    <div
      className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
      <h3 className="text-gray-800 text-lg font-semibold">Locked Tokens</h3>
      <p className="mt-1 text-sm text-gray-500">{account ? String(totalTokens) : " " }</p>

     
    </div>
    <div
      className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
      <h3 className="text-gray-800 text-lg font-semibold">Claimed Tokens</h3>
      <p className="mt-1 text-sm text-gray-500">{account ? String(receivedTokens) : " " }</p>

  
    </div>
   </div>
   
 
    </div></>
  )
}

export default ModuleOne