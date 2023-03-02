
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
  // 更新日志
  console.log("hook触发了！",req.body);
  const { hook } = req.body;
  if (hook.events?.[0] !== "push") {
    res.status(500).json("not allow!")
  }
  res.status(200).json("ok");
}