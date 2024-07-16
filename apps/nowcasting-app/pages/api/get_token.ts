import { getAccessToken, withApiAuthRequired } from "../../components/helpers/authWrapper";

export default withApiAuthRequired(async function token(req, res) {
  try {
    const accessToken = await getAccessToken(req, res);
    res.status(200).json(accessToken);
  } catch (error: any) {
    res.status(error.status || 400).end(error.message);
  }
});
