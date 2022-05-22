import axios from "axios";
export default async  function getComments({ query: { id } }, res){
    const comments = (await axios.get(`${process.env.API_HOST}/blog/comments/allComments/${encodeURI(id)}`))?.data
    res.status(200).json(comments || []) 
}