import createClient from "openapi-fetch";
import { paths } from "@/src/types/schema";

const client = createClient<paths>({
  baseUrl: "https://api-dev.quartz.energy/",
  // "http://localhost:8000/",
  // headers: {
  //   Authorization: `Bearer ${process.env.API_KEY}`,
  // },
});

export default client;
