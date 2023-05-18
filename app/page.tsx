"use client";
import Image from "next/image";
import { createClient } from "redis";
import { useState, useEffect, use, Suspense } from "react";
import { env } from "process";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const createRedisClient = async () => {
    const password = process.env.REDIS_PASSWORD;
    const username = process.env.REDIS_USERNAME;
    const name = process.env.REDIS_NAME;
    const host = process.env.REDIS_HOST;
    const port = process.env.REDIS_PORT;
    console.log(password, username, name, host, port);
    if (!password || !username || !name || !host || !port) {
      throw new Error("Missing env vars");
    }
    const client = createClient({
      password,
      socket: {
        host,
        port: Number(port),
      },
    });
    await client.connect();
    return client;
  };

  const getCounter = async () => {
    const redis = await createRedisClient();
    const counter = await redis.get("counter");
    console.log(counter);
    void redis.disconnect();
    return counter;
    // console.log(response.data);
    // return Number(response.data);
  };
  const { data: counter } = useQuery(["counter"], getCounter, {
    refetchInterval: 1000,
  });

  console.log(counter);

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
