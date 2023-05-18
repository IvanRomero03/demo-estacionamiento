"use client";
import Image from "next/image";
import { createClient } from "redis";
import { useState, useEffect, use, Suspense } from "react";
import { env } from "process";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getCounter = async () => {
  const response = await axios.get(
    "https://demo-estacionamiento.vercel.app/api"
    //"http://localhost:3000/api"
  );
  console.log(response.data.count);
  return Number(response.data.count);
};

export default function Home() {
  const { data: counter } = useQuery(["counter"], getCounter, {
    refetchInterval: 1000,
    cacheTime: 0,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex space-y-8">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold text-xl">Demo Contador</code>
        </p>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <p className="text-white text-bold text-9xl font-mono font-bold z-10">
            {/* <Suspense fallback={<div>Loading...</div>}>
              <div>{counter}</div>
            </Suspense> */}
            {counter}
          </p>
        </div>
      </div>
    </main>
  );
}
