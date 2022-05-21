import axios from "axios";
export default async function getComments(req, res) {
  await axios.post(
    "http://pegasus.codehunter.cn/blog/comments/addComments",
    req.body
  );
  res.status(200).json();
}
