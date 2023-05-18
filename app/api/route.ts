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
  await redis.disconnect();
  // headers: { "Content-Type": "application/json", 'Cache-Control', 's-maxage=0' }
  // body { count: count }
  return new NextResponse(JSON.stringify({ count }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, max-age=0",
    },
  });
};

// export default GET;
