import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "../redis_client";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const count = await redis.get("counter");
  console.log({ count });
  return new Response(String(count), { status: 200 });
  res.status(200).json({ count });
};

// export default GET;