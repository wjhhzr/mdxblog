// @ts-nocheck
import React from 'react';
import styled, { keyframes } from 'styled-components';

// 最外层容器
const IntroduceWrapper = styled.h1`
    width: 100%;
    padding: 100px calc(50% - 500px);
    font-size: 90px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 auto;
    color: var(--color-gray-1000);
    /* background-image: linear-gradient( 0deg,var(--color-homepage-light),var(--color-homepage-dark) ); */
`;

// 轮播字显示区
const Mask = styled.div`
    position: relative;
    overflow: hidden;
    height: 106px;
    /* border: 1px solid black; */
`;

const lunbo = keyframes`
    0%{
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-66%);
    }
`;

// 轮播字容器
const LunboWrapper = styled.div`
    animation: 5s lunbo;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-timing-function: steps(3);
    display: inline-block;
    @keyframes lunbo {
        0%{
        transform: translateY(-0%);
    }
    100% {
        transform: translateY(-100%);
    }
    }
`;

// 轮播字
const LunboText = styled.span`
    display: block;
    --start: hsl(calc(var(--color-start) * 240deg), 60%, 60%);
    --end: hsl(calc(var(--color-end) * 240deg), 80%, 60%);
    background-image: linear-gradient(90deg,var(--start), var(--end));
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
`;


const Introduce = ({
    texts,
    title
}) => {
    const l = texts?.length || 0;
    return <IntroduceWrapper>
        {title}
        <Mask  >
            <LunboWrapper style={{"--text-length": l}} >
                {texts && texts.map((t, i) => <LunboText key={i} style={{ "--color-start": i, "--color-end": i + 1 }} >{t}</LunboText>)}
            </LunboWrapper>
        </Mask>
    </IntroduceWrapper>
}

export default Introduce;