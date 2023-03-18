import mongo from "src/lib/db/mongo";
import { COLLECTIONS } from "src/constants";
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function like(req: NextApiRequest, res: NextApiResponse) {
    const { body: {
        articleId,      // 文章id
        likenum, // 喜欢数量
        userid   // 用户id
    } } = req;
    // 根据用户名和id，查询并更新
    mongo.setCollection(COLLECTIONS.article)
    const data = (await mongo.query({ articleId }))?.[0];
    // // 如果没有数据，就插入一条数据
    if (!data) {
        mongo.insert({
            articleId,
            like: [
                {
                    userid,
                    likenum
                }
            ]
        })
    } else {
        const oldLike = data.like.filter(({ userid: ouid }) => ouid !== userid);
        oldLike.push({ userid, likenum });
        mongo.findAndUpdate({ articleId }, {$set: {like: oldLike }})
    }
    res.status(200).json({})
}