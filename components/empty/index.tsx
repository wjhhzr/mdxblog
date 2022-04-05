import React from 'react';
import { EmptyWrapper } from "./style"


 const Empty = ({
    description = "空空如也"
}:{
    description:string
})=>{
    return <EmptyWrapper>
        {description}
    </EmptyWrapper>
}

export default Empty