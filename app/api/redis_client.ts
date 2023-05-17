import { createClient } from "redis";

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

export const redis: Awaited<ReturnType<typeof createRedisClient>> =
  globalForRedis.redis ||
  (async () => await createRedisClient())().then((redis) => {
    return redis;
  });

globalForRedis.redis = redis;
