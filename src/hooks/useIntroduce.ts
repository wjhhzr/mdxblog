import { useRouter } from "next/router"
import { INTRODUCE } from "src/constants"

export default ()=>{
    const {route} = useRouter()
    return INTRODUCE[route]
}