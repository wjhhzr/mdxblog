import axios from "axios";
import Mongo from "lib/db/mongo";

export default async function getComments(req, res) {
  console.log("添加评论", req.body);
  const mongo = new Mongo({
    dbUrl: process.env.DB,
    database: "blog",
    collection: "comments"
  })
  await mongo.insert(req.body)
  res.status(200).json();
}
