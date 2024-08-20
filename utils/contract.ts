import { getContract } from "thirdweb";
import {client} from "@/app/client";
import { chain } from "@/app/chain";
import CONTRACT_ABI from  "./contractABI.json"

// const contractAddress = "0xffD1296113240dd3ee4D99A2C28FeD26C0983142";
// const contractAddress = "0x01e5639355f827F0264EC317ECd37FC1Cb63fcde";
const contractAddress = "0xb46Ab233f45FD02787645da8BF9DF5Ed016A1907";


export const contractVesting = getContract({
    client:client,
    chain: chain , 
    address: contractAddress,
    abi: CONTRACT_ABI,

});

