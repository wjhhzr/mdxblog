import axios from "axios";
import Mongo from "lib/db/mongo";
export default async function getComments(req, res) {
  const { info } = req.query
  const mongo = new Mongo({
    dbUrl: process.env.DB,
    database: "blog",
    collection: "userLog"
  })
  await mongo.insert(JSON.parse(info))
  res.status(200).json();
}