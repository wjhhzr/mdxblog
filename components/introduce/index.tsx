// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { animated, useSpring, useTrail } from 'react-spring';
import styled, { css, keyframes } from 'styled-components';
import { getWidth, mobileBreakpoint } from "lib/function/cssMixins";
import useTextWidth from 'src/hooks/useFontWidth';

// 最外层容器
const IntroduceWrapper = styled.h1`
    --font-size: calc( ( 50 / 1000 ) * 100vw);
    ${mobileBreakpoint("--font-size: calc( ( 70 / 1000 ) * 100vw);")}

    padding: var(--font-size) 0;
    font-size: var(--font-size);
    color: var(--color-gray-1000);
    white-space: pre-wrap;
`;

// 轮播字显示区
const Mask = styled.span`
    position: relative;
    display: inline-block;
    vertical-align: top;
    /* width: -webkit-fill-available; */
    /* height: var(--font-size); */
`;

const fadeIn = keyframes`
    from{opacity:0;transform:translateY(50%)}to{opacity:1;transform:translateY(0)}
`;

const fadeOut = keyframes`
    from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-50%)}
`;

// 轮播字
const LunboText = styled.span`
    display: inline-block;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-clip: text;
    -webkit-background-clip: text;
    vertical-align: bottom;
    color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    z-index: 1;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    transform: translateY(100%);
    animation-fill-mode: both;
    ${({ show, up, delay }) => {
        if (show) {
            return css`
                animation: ${fadeIn} 400ms cubic-bezier(.14,.98,.08,.98) forwards;
                ${delay && css`animation-delay: 250ms`}
            `;
        }

        if (up) {
            return css`
                animation: ${fadeOut} 250ms cubic-bezier(.14,.98,.08,.98) forwards;
            `;
        }
    }};

`;

let DEFAULT_IMAGE = "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)";

const Introduce = ({
    labels,
    title,
    delay = true,
    ...rest
}) => {
    const l = labels?.length || 0;
    // 当前展示的文字索引，默认第一个元素
    const [showIndex, setShowIndex] = useState(0);

    // 当前已展示过的文字索引
    const [upIndex, setUpIndex] = useState();

    const {maxL, maxText} = useMemo(() => maxLength(labels, "label"), [])
    // // 文字宽度
    // const width = useTextWidth(maxText, "calc( ( 70 / 1000 ) * 100vw)"); 
    // console.log("文字的宽度",maxText, width);
    
    function maxLength(arr, key) {
        let maxL = 0;
        let maxIndex = 0;
        arr.map((i,k) => {
            const l = i[key].length;
            if (l > maxL) {
                maxL = l;
                maxIndex = k;
            }
        })

        return {maxL, maxText:arr[maxIndex]};
    }

    useEffect(() => {
        let timer = setInterval(() => {
            // 当前应该上去的元素
            let upIndex = showIndex;
            // 当前应该展示的元素
            let curIndex = showIndex + 1 >= l ? 0 : showIndex + 1;
            // 当前应该下去的元素
            setShowIndex(curIndex);
            setUpIndex(upIndex);
        }, 3000)
        return () => {
            clearInterval(timer)
        }
    }, [showIndex])


    return <IntroduceWrapper  {...rest} >
        {title}
        <Mask style={{ width: `${maxL}ch` }} >
            {labels && labels.map(({ backgroundImage = DEFAULT_IMAGE, label }, i) => <LunboText key={i} delay={delay} show={showIndex === i} up={upIndex === i} style={{ "--color-start": i, "--color-end": i + 1, backgroundImage }} >{label}</LunboText>)}
        </Mask>
    </IntroduceWrapper>
}

export default Introduce;