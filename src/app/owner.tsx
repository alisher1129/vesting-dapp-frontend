"use client"

import React, { useState } from "react";
import { useActiveAccount, useSendTransaction  , useReadContract } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contractVesting } from "../../utils/contract";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Owner() {
  const [employeeAddress, setEmployeeAddress] = useState<string>("");
  const [totalToken, setTotalToken] = useState<string>("");
  const [employeeNameData, setEmployeeName] = useState<string>("");
  const [employeeEmailData, setEmployeeEmail] = useState<string>("");
  const [removeEmployeeMapping, setRemoveEmployeeMapping] = useState<string>("");

  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();
  //Function to add employee in mapping
  const addEmployeeFunction = async () => {
      if (!account) {
        toast.error("No Wallet Connected");
      }

      try {
         const transaction = await prepareContractCall({
          contract:contractVesting,
          method: "addEmployee",
          params: [ employeeAddress , totalToken ,employeeNameData,employeeEmailData ],
        });

        sendTransaction(transaction);
      } catch (error) {
        console.error("Error preparing or sending transaction:", error);
      }
    };

  //Function to remove employee from mapping
  const removeEmployee = async () => {
    if (!account) {
      toast.error("No Wallet Connected");
    
    }

    try {
      const transaction = await prepareContractCall({
        contract: contractVesting,
        method: "removeEmployee",
        params: [removeEmployeeMapping],
      });
      sendTransaction(transaction);

    } catch (error) {
      console.error("Error preparing or sending transaction:", error);
    }
  };


  //Function to check employee exist or not
  const {data: checkToRemove } =  useReadContract({ 
    contract:contractVesting, 
    method: "employeeCheck", 
    params: [removeEmployeeMapping],
  })
  const {data: checkToAdd } =  useReadContract({ 
    contract:contractVesting, 
    method: "employeeCheck", 
    params: [employeeAddress] ,
  })
  const connectWallet = ()=> toast.error("No Wallet Connected");
  const notExist = ()=>      toast.error("Employee doesn't exist");
  const alreadyExist = ()=> toast.error("Employee already exist");  
  return (
    <>
      <div className="flex flex-col justify-center  mt-16">
        {/* ADD EMPLOYEE */}
        <div>
          <div className="flex justify-center mb-8 font-extrabold font-serif text-5xl">
            Add Employee
          </div>
          <form className="font-[sans-serif] max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Employee Address"
                  value={employeeAddress}
                  onChange={(e)=>setEmployeeAddress(e.target.value)}
                  className="px-20 py-4 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                />
              </div>

              <div className="relative flex items-center">
                <input
                  type="number"
                  placeholder="Total Tokens"
                  value={totalToken}
                  onChange={(e)=>setTotalToken(e.target.value)}
                  className="px-20 py-4 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                />
              </div>

              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Employee Name"
                  value={employeeNameData}
                  onChange={(e)=>setEmployeeName(e.target.value)}
                  className="px-20 py-4 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                />
              </div>

              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Employee Email"
                  value={employeeEmailData}
                  onChange={(e)=>setEmployeeEmail(e.target.value)}
                  className="px-20 py-4 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={account ? (checkToAdd ?  alreadyExist : addEmployeeFunction  ): connectWallet }
              className="mt-8 px-6 py-3 text-sm w-full bg-[#007bff] hover:bg-[#006bff] text-white rounded transition-all"
            >
              Add
            </button>
          </form>
        </div>

        {/* REMOVE EMPLOYEE */}

        <div className="mt-8">
          <div className="flex justify-center mb-8 font-extrabold font-serif text-5xl">
            Remove Employee
          </div>
          <form className="font-[sans-serif] max-w-4xl mx-auto">
            <div className="flex items-center">
              <input
                type="text"
                value={removeEmployeeMapping}
                onChange={(e) => setRemoveEmployeeMapping(e.target.value)}
                placeholder="Employee Address"
                className="px-20 py-4 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>

            <button
              type="button"
              onClick={account ?(checkToRemove ? removeEmployee : notExist ): connectWallet}
              className="mt-8 px-6 py-3 text-sm w-full bg-[#007bff] hover:bg-[#006bff] text-white rounded transition-all"
            >
              Remove
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Owner;
