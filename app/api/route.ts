import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";

//import { redis } from "./redis_client";

const createRedisClient = async () => {
  const password = process.env.REDIS_PASSWORD;
  const username = process.env.REDIS_USERNAME;
  const name = process.env.REDIS_NAME;
  const host = process.env.REDIS_HOST;
  const port = process.env.REDIS_PORT;
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

export const GET = async (req: Request) => {
  const redis = await createRedisClient();
  const count = await redis.get("counter");
  console.log({ count });
  redis.disconnect();
  return new Response(String(count), { status: 200 });
};

// export default GET;
