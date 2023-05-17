import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "../redis_client";

export const GET = async (req: Request) => {
  const count = await redis.get("counter");
  console.log({ count });
  return new Response(String(count), { status: 200 });
};

// export default GET;
