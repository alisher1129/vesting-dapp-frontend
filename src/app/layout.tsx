'use client'

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "./thirdweb";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "../app/Header"






const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "thirdweb SDK + Next starter",
//   description:
//     "Starter template for using thirdweb SDK with Next.js App router",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
<Header/>
          {children}
          <ToastContainer autoClose={1700} />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
