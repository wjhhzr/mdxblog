import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import NextImage from 'next/image'
const ImageWrapper = styled.span`
    position:relative;
    display:block ;
    margin-top: 2em;
    margin-bottom: 2em;
    width: 100%;
    aspect-ratio: 16/9;
`;

function Image(props){
    if (props.src.includes("mp4")) {
        return <video playsInline loop muted autoPlay={true}  src={props.src} />
    }
    return <ImageWrapper  >
        <NextImage {...props} layout="fill" objectFit="cover"  alt='图片' />
    </ImageWrapper>
}


export default Image;