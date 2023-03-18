// @ts-nocheck
import React from "react";
import useTextWidth from "src/hooks/useFontWidth";
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

const Item = ({
    label,
    time,
    ...rest
})=>{
    const width = useTextWidth(time, "14px");
    return <ItemWrapper {...rest} style={{"--left-percent": width }} >
        <ItemTail></ItemTail>
        <TimeText >{time}</TimeText>
        <Timedot></Timedot>
        <TimeLabel>{label}</TimeLabel>
    </ItemWrapper>
}

TimeLine.Item = Item

export default TimeLine;