import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessToken = { "accessToken": process.env.AUTH0_SECRET }
    res.status(200).json(accessToken);
  } catch (error: any) {
    res.status(error.status || 400).end(error.message);
  }
};
