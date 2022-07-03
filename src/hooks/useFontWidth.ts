import React from 'react'
import { getWidth } from "lib/function/cssMixins";
import { useEffect, useState } from "react";

function useTextWidth(text:string,fontSize:any){
    const [ width, setWidth ] = useState(0)

    useEffect(()=>{
        setWidth(getWidth(text,fontSize))
    },[])

    return width + "px"
}

export default useTextWidth;