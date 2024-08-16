"use client";

import React, { useActionState } from "react";
import {
  useActiveAccount,
  useContractEvents,
  useReadContract,
} from "thirdweb/react";
import { contractVesting } from "../../utils/contract";
import contractABI from "../../utils/contractABI.json";

function Cover() {
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
    <>
      <div className="mt-5 bg-gray-50 text-gray-800 p-8 w-full rounded-lg font-[sans-serif] max-w-screen-2xl mx-auto">
        <h1 className="text-4xl font-extrabold">{account ? String(employeeName) : "Employee Name" }</h1>
        <p className="mt-4 text-sm text-gray-600">{account ? String(employeeEmail) : "Employee Email Address" }</p>

        <button
          type="button"
          className="px-6 py-3 mt-8 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700"
        >
          Learn more
        </button>
      </div>
    </>
  );
}

export default Cover;
