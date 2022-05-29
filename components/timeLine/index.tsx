import React from "react";
import TimeLineWrapper,{ItemWrapper, ItemTail, TimeText, TimeLabel, Timedot} from './style'

const TimeLine = ({
    children,
    ...rest
})=>{
    return (
        <TimeLineWrapper  {...rest}>
            {children && children}
        </TimeLineWrapper>
    )
}

TimeLine.Item = ({
    label,
    time,
    ...rest
})=>{
    
    return <ItemWrapper {...rest} >
        <ItemTail></ItemTail>
        <TimeText >{time}</TimeText>
        <Timedot></Timedot>
        <TimeLabel>{label}</TimeLabel>
    </ItemWrapper>
}

export default TimeLine;