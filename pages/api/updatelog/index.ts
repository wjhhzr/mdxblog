
import mongo from "lib/db/mongo";
import { COLLECTIONS } from "src/constants";
import type { NextApiRequest, NextApiResponse } from 'next'
import {createHmac} from "crypto";
export default async function updateLog(req:NextApiRequest, res: NextApiResponse) {
  // 加密密钥
  const gitToken = req.headers["x-hub-signature-256"]
  const hamc =  createHmac("sha256", process.env.TOKEN).update(JSON.stringify(req.body)).digest("hex")
  const shaHamc = "sha256=" + hamc
  // 验证密钥
  if (shaHamc !== gitToken) {
    res.status(500).json("not allow!")
  }
  try {
    // 更新日志
    console.log("hook触发了！",req.body);
    const { head_commit, ref } = req.body;
    const {id, timestamp, message, author} = head_commit;
    const commitInfo = {
      hash: id,
      date: timestamp,
      message,
      refs: ref,
      body: "",
      author_name:author?.name,
      author_email: author?.email
    }
    mongo.setCollection(COLLECTIONS.updateLog);
    await mongo.insert(commitInfo)
    res.status(200).json("ok");
  } catch (error) {
    console.error(error);
    res.status(500).json("update error!")
  }
}