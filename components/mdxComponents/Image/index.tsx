// @ts-nocheck
import React, { useContext, useEffect, useRef } from 'react';
import styled from "styled-components";
import NextImage from 'next/image'
import VideoGif from 'components/video'
import { ThemeContext } from 'lib/theme';
export const ImageWrapper = styled.span`
    position:relative;
    display:block ;
    margin-top: 2em;
    margin-bottom: 2em;
    width: 100%;
    aspect-ratio: 16/9;
    z-index: 1;
    border-radius:5px ;
    padding: calc(100% / 16 * 9 / 2) 0;
`;

function Image(props){
    if (props.src.includes("mp4")) {
        return <VideoGif  src={props.src}   />
    }
    return <ImageWrapper >
        <NextImage {...props} layout="fill" objectFit="contain"  alt='图片' />
    </ImageWrapper>
}


export default Image;