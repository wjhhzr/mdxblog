import axios from "axios";
export default async function getComments(req, res) {
  const { info } = req.query
  await axios.get(`${process.env.API_HOST}/log/insert/${encodeURIComponent(info)}`);
  res.status(200).json();
}