
import Mongo from "lib/db/mongo";
export default async function getComments(req, res) {
  const mongo = new Mongo({
    dbUrl: process.env.DB,
    database: "blog",
    collection: "userLog"
  })
  await mongo.insert(JSON.parse(decodeURIComponent(req.body)))
  res.status(200).json();
}