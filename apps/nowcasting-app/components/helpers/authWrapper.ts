import { NextApiResponse, NextApiRequest, NextApiHandler } from 'next';
import { useUser as useUserAuth0, UserContext, withApiAuthRequired as withApiAuthRequiredAuth0, getAccessToken as getAccessTokenAuth0, GetAccessTokenResult } from "@auth0/nextjs-auth0";
export { UserProvider } from "@auth0/nextjs-auth0"; 

function isDev() {
    return process.env.NODE_ENV === "development"
}

export function withApiAuthRequired(apiRoute: NextApiHandler): NextApiHandler {
    if (isDev()) {
        // don't require a session token when 
        return apiRoute
    }
    return withApiAuthRequiredAuth0(apiRoute)
}

export async function getAccessToken(req: NextApiRequest, res: NextApiResponse): Promise<GetAccessTokenResult> {
    if (isDev()) {
        // for local development make sure this env variable is set
        return { accessToken: process.env.AUTH0_SECRET } as GetAccessTokenResult
    }
    return getAccessTokenAuth0(req, res)
}

export function useUser(): UserContext {
    if (isDev()) {
        return {} as UserContext;
    }
    return useUserAuth0()
}