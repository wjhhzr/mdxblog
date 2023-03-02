import mongo from "lib/db/mongo";
import { COLLECTIONS } from "src/constants";


export default async function getComments(req, res) {
  mongo.setCollection(COLLECTIONS.comments)
  await mongo.insert(req.body)
  res.status(200).json();
}
