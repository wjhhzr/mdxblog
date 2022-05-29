import axios from "axios";
export default async  function getLogs(req, res){
    const logs = (await axios.get(`${process.env.API_HOST}/blog/gitlog/getLogs`))
    res.status(200).json(logs || []) 
}