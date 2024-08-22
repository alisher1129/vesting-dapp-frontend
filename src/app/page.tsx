"use client";

import Cover from "@/app/cover";
import ModuleOne from "./moduleOne";
import ModuleTwo from "./moduleTwo";
import { useActiveAccount } from "thirdweb/react";

export default function Home() {
  const account = useActiveAccount();
  const myAccount = String(account);
  const adminAccount = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS;
  // const user = "0x13101a2e6497817C2307E932F0bC90bD8f52b1d3";

  //   const Here = ()=> {
  //    const myAccount = String(account)
  //    if(myAccount === user  ){
  // return true;
  //    }else{
  // return false;
  //    }
  //   }
  //   Here()

  return (
    <>
     
      <div>
        <>
          <Cover />
          <ModuleOne />
          <ModuleTwo />
        </>
      </div>

      {/* <footer
        className=" shadow-md border-t-2 border-gray-400 mt-28 bg-white text-black py-6 px-16 font-sans tracking-wide"
      >
        <div className="flex justify-between items-center max-lg:flex-col text-center flex-wrap gap-4">
          <p className="text-[18px] leading-loose">
            © ReadymadeUI. All rights reserved.
          </p>
        </div>
      </footer> */}
    </>
  );
}
