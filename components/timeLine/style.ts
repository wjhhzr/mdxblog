import styled from "styled-components";

const TimeLineWrapper = styled.ul`
    list-style: none;
`;

// 时间线段
const ItemTail = styled.div`
    position: absolute;
    left: calc(var(--left-percent)  +  4px);
    top: 10px;
    height: calc(100% - 10px);
    border-left: 2px solid var(--color-gray-100);
`;

// 时间项容器
const ItemWrapper = styled.li`
    position: relative;
    margin: 0;
    padding-bottom: 20px;
    font-size: 14px;
    list-style: none;
    padding-bottom: 50px;

    &:last-child {
        ${ItemTail} {
            display: none;
        }
    }
`;



// 时间
const TimeText = styled.div`
    position: absolute;
    width: calc(var(--left-percent) - 12px);
    text-align: right;
    top: -7px;
`;

// 内容
const TimeLabel = styled.div`
    position: relative;
    left: calc(var(--left-percent) - 4px);
    top: -7px;
    width: calc(100% -  var(--left-percent) - 14px);
    text-align: left;
    margin-left: 20px;
    word-break: break-word;
`;

// 时间线原点
const Timedot = styled.div`
    position: absolute;
    left: var(--left-percent);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color-background);
    border: 2px solid var(--color-primary) ;
`;


export default TimeLineWrapper;

export { ItemWrapper, ItemTail, TimeText, TimeLabel, Timedot }