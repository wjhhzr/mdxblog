// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { useSpring } from 'react-spring';
import styled, { css, keyframes } from 'styled-components';

// 最外层容器
const IntroduceWrapper = styled.h1`
    --font-size: calc( ( 50 / 1000 ) * 100vw);

    @media screen and ${p => p.theme.breakpoints.mobile} {
        --font-size: calc( ( 70 / 1000 ) * 100vw);
    };
    width: 100%;
    padding: var(--font-size) 0;
    font-size: var(--font-size);
    color: var(--color-gray-1000);
    white-space: pre-wrap;
`;

// 轮播字显示区
const Mask = styled.div`
    position: relative;
    display: inline-block;
    vertical-align: top;
    /* width: -webkit-fill-available; */
    height: var(--font-size);
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
    --start: hsl(calc(var(--color-start) * 70deg), 80%, 60%);
    --end: hsl(calc(var(--color-end) * 70deg), 80%, 60%);
    background-image: linear-gradient(90deg,var(--start), var(--end));
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
    ${({ show, up }) => {
        if (show) {
            return css`
                animation: ${fadeIn} .4s cubic-bezier(.19,1,.22,1) forwards;
                animation-delay: 250ms;
            `;
        }

        if (up) {
            return css`
                animation: ${fadeOut} 250ms cubic-bezier(.19,1,.22,1) forwards;
            `;
        }
    }};

`;

let timer;

const Introduce = ({
    labels,
    title
}) => {
    const l = labels?.length || 0;
    // 当前展示的文字
    const [cur, setCur] = useState(0);
    // 当前在上面的文字
    const [up, setUp] = useState();

    const maxL = useMemo(()=>maxLength(labels, "label"),[]) 
    
    function maxLength(arr, key){
        let max = 0;
        arr.map(i=>{
            const l = i[key].length;
            (l > max) && (max = l)
        })
        return max;
    }

    useEffect(() => {
        timer = setInterval(() => {
            // 当前应该上去的元素
            let upIndex = cur;
            // 当前应该展示的元素
            let curIndex = cur + 1 >= l ? 0 : cur + 1;
            // 当前应该下去的元素
            setCur(curIndex);
            setUp(upIndex);
        }, 3000)
        return () => {
            clearInterval(timer)
        }
    }, [cur])

    const maskSpring = useSpring({
        opacity: 0,
        transform: "translateY(50%)",
        config: {
            mass: 3.1,
            friction: 21,
        },
    });
    return <IntroduceWrapper>
        {title}
        <Mask style={{width:`${maxL*2}ch`}} >
            {labels && labels.map(({ backgroundImage, label }, i) => <LunboText key={i} show={cur === i} up={up === i} style={{ "--color-start": i, "--color-end": i + 1, backgroundImage: backgroundImage }} >{label}</LunboText>)}
        </Mask>
    </IntroduceWrapper>
}

export default Introduce;