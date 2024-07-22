'use client'
import React, { useEffect, useState } from "react";
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/components/loadingpage/LoadingPage'; // Import komponen LoadingPage

export default function Home() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (address && isConnected) {
      setIsLoading(true); // Set loading state to true
      router.push("/main");
    }
  }, [address, isConnected, router]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="fixed w-screen h-screen flex items-center justify-center bg-black z-50">
      <div className="bg-[#1b457d] 2xl:max-w-lg max-w-sm rounded-lg shadow-lg text-center p-10">
        <div className="wraptitle text-white flex flex-col justify-center items-center">
          <p className="text-3xl font-bold mb-4">Welcome To XYZMER Dashboard</p>
          <p className="text-xl font-light mb-4">Please Connect Your wallet to continue</p>
        </div>
        <div className="flex justify-center items-center gap-5 mt-5">
          <a
            href="https://xyzmercoin.xyz"
            className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
          >
            Go Home
          </a>
          <w3m-button />
        </div>
      </div>
    </div>
  );
}
