import { useUser as useUserAuth0, UserContext } from "@auth0/nextjs-auth0";

export { UserProvider } from "@auth0/nextjs-auth0"; 


export function useUser(): UserContext {
    // var secret = process.env.AUTH0_SECRET;
    // {
    //     email: "foo@bar.com"
    //     // email_verified?: boolean | null;
    //     name?: string | null;
    //     nickname?: string | null;
    //     picture?: string | null;
    //     sub?: string | null;
    //     updated_at?: string | null;
    //     org_id?: string | null;
    //     [key: string]: unknown; // Any custom claim which could be in the profile
    // }
    return {} as UserContext;

}