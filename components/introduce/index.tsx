// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// 最外层容器
const IntroduceWrapper = styled.h1`

    --font-size: calc( ( 90 / 1100 ) * 100vw);
    --calc-size: calc( ( 10 / 1100) * 100vw );

    width: 100%;
    padding: var(--font-size) 0;
    font-size: var(--font-size);
    color: var(--color-gray-1000);
`;

// 轮播字显示区
const Mask = styled.div`
    position: relative;
    overflow: hidden;
    height: calc(var(--font-size) + var(--calc-size));
    display: inline-block;
    width: var(--font-length);
    vertical-align: middle;
`;

// 轮播字
const LunboText = styled.span`
    display: block;
    --start: hsl(calc(var(--color-start) * 70deg), 80%, 60%);
    --end: hsl(calc(var(--color-end) * 70deg), 80%, 60%);
    background-image: linear-gradient(90deg,var(--start), var(--end));
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    position: absolute;
    vertical-align: bottom;
    height: calc(var(--font-size) + 10px) ;
    top:var(--font-size);
    ${({show, up})=>{
        if (show) {
            return css`
                transition: transform 0.5s ease-out;
                transform: translateY(-100%);
            `;
        }

        if (up) {
            return css`
                transition: transform 0.5s ease-in;
                transform: translateY(-200%);
            `;
        }
    }};

`;

let timer;

const Introduce = ({
    texts,
    title
}) => {
    const l = texts?.length || 0;
    console.log(texts);
    // 当前展示的文字
    const [cur, setCur] = useState(0);
    // 当前在上面的文字
    const [up ,setUp ] = useState();

    const maxLength = [...texts].sort((a,b)=>b.length - a.length)[0].length;
    console.log(maxLength);
    
    useEffect(()=>{
        timer = setInterval(()=>{
            // 当前应该上去的元素
            let upIndex = cur;
            // 当前应该展示的元素
            let curIndex = cur + 1 >= l ? 0 : cur + 1;
            // 当前应该下去的元素
            setCur(curIndex);
            setUp(upIndex);
        },2500)
        return ()=>{
            clearInterval(timer)
        }
    },[cur])

    return <IntroduceWrapper>
        {title}
        <Mask style={{"--font-length": maxLength * 2 + "ch"}} >
            {/* <LunboWrapper style={{"--text-length": l}} > */}
                {texts && texts.map((t, i) => <LunboText key={i} show={cur === i}  up={up===i}  style={{ "--color-start": i, "--color-end": i + 1 }} >{t}</LunboText>)}
            {/* </LunboWrapper> */}
        </Mask>
    </IntroduceWrapper>
}

export default Introduce;