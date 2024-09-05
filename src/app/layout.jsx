"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "./thirdweb";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Vesting Dapp",
//   description:
//     "Starter template for using thirdweb SDK with Next.js App router",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          <Header />
          {children}
          <ToastContainer autoClose={1700} />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
