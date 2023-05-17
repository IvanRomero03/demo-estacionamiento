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

const globalForRedis = globalThis as unknown as {
  redis: Awaited<ReturnType<typeof createRedisClient>>;
};

const redis: Awaited<ReturnType<typeof createRedisClient>> =
  globalForRedis.redis ||
  (async () => await createRedisClient())().then((redis) => {
    return redis;
  });

globalForRedis.redis = redis;

export const GET = async (req: Request) => {
  const count = await redis.get("counter");
  console.log({ count });
  return new Response(String(count), { status: 200 });
};

// export default GET;
