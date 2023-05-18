import { NextResponse } from "next/server";
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

export const GET = async () => {
  const redis = await createRedisClient();
  const count = await redis.get("counter");
  console.log({ count });
  redis.disconnect();
  return NextResponse.json({ count });
};

// export default GET;
