import axios from "axios";
import mongo from "lib/db/mongo";
import { COLLECTIONS } from "src/constants";
export default async function getComments(req, res) {
  const { info } = req.query
  mongo.setCollection(COLLECTIONS.userLog)
  await mongo.insert(JSON.parse(info))
  res.status(200).json();
}