import axios from "axios";
export default async  function getComments({ query: { id } }, res){
    const comments = (await axios.get(`http://pegasus.codehunter.cn/blog/comments/allComments/${encodeURI(id)}`))?.data
    res.status(200).json(comments || []) 
}