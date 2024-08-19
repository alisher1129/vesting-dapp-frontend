import { getContract } from "thirdweb";
import {client} from "@/app/client";
import { chain } from "@/app/chain";
import CONTRACT_ABI from  "./contractABI.json"

// const contractAddress = "0xffD1296113240dd3ee4D99A2C28FeD26C0983142";
const contractAddress = "0x01e5639355f827F0264EC317ECd37FC1Cb63fcde";


export const contractVesting = getContract({
    client:client,
    chain: chain , 
    address: contractAddress,
    abi: CONTRACT_ABI,

});

