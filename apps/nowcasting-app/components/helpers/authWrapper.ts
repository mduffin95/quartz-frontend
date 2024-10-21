import { NextApiResponse, NextApiRequest, NextApiHandler } from "next";
import {
  withApiAuthRequired as withApiAuthRequiredAuth0,
  getAccessToken as getAccessTokenAuth0,
  GetAccessTokenResult
} from "@auth0/nextjs-auth0";

export { UserProvider, useUser } from "@auth0/nextjs-auth0";

function isDev() {
  return process.env.NODE_ENV === "development";
}

export function withApiAuthRequired(apiRoute: NextApiHandler): NextApiHandler {
  if (isDev()) {
    // don't require a session cookie when running locally
    return apiRoute;
  }
  return withApiAuthRequiredAuth0(apiRoute);
}

export async function getAccessToken(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<GetAccessTokenResult> {
  if (isDev()) {
    // for local development make sure this env variable is set
    return { accessToken: process.env.BEARER_TOKEN } as GetAccessTokenResult;
  }
  return getAccessTokenAuth0(req, res);
}
