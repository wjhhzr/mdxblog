import axios from "axios";
export default async function getComments(req, res) {
  await axios.post(
    `${process.env.API_HOST}/blog/comments/addComments`,
    req.body
  );
  res.status(200).json();
}
