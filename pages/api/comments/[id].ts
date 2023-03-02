import { COLLECTIONS } from "src/constants";
import mongo from "lib/db/mongo";
export default async  function getComments({ query: { id } }, res){
    mongo.setCollection(COLLECTIONS.comments)
    const comments = await mongo.query({articleId:id}, {date: 1})
    res.status(200).json(comments || []) 
}