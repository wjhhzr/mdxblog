import Mongo from "lib/db/mongo";
export default async  function getComments({ query: { id } }, res){
    const mongo = new Mongo({
        dbUrl: process.env.DB,
        database: "blog",
        collection: "comments"
    })
    const comments = await mongo.query({articleId:id}, {date: 1})
    res.status(200).json(comments || []) 
}