// @ts-nocheck
import React, { useContext, useEffect, useRef } from 'react';
import styled, { css } from "styled-components";
import NextImage from 'next/image'
import VideoGif from 'components/video'
import { aspectRatioHack } from 'lib/function/cssMixins'
export const ImageWrapper = styled.span`
    position:relative;
    display:block ;
    width: 100%;
    ${({ type }) => type === "photo" ? aspectRatioHack(1000, 679) : aspectRatioHack(16, 9)}
    z-index: 0;
`;

const PhotoWrapper = styled.span`
    display: inline-block;
    padding: 10px 10px 0;
    border: 1px solid var(--color-gray-100);
    width: 100%;
    margin-bottom: 20px;
    ${({ type }) => type === "photo" && css`
    box-shadow:
        0px 0.5px 4.2px rgba(0, 0, 0, 0),
        0px 1.2px 7.7px rgba(0, 0, 0, 0.003),
        0px 2.7px 12.5px rgba(0, 0, 0, 0.014),
        0px 7px 27px rgba(0, 0, 0, 0.06);
    `}
`;

const ImgTipWrapper = styled.span`
    display: inline-block;
    width: 100%;
    text-align: center;
    padding:  0 0 5px;
`;
const ImgTip = styled.span`
    display: inline-block;  
    text-align: left;
    color: var(--color-gray-700);
    font-size: 16px;
`;

function Image(props) {
    if (props.src.includes("mp4")) {
        return <VideoGif src={props.src} />
    }

    return (
        <PhotoWrapper type={props.type} >
            <ImageWrapper type={props.type} >
                <NextImage {...props} layout="fill" objectFit="contain" alt='图片' />
            </ImageWrapper>
            <ImgTipWrapper >
                <ImgTip>
                    {props.alt}
                </ImgTip>
            </ImgTipWrapper>
        </PhotoWrapper>
    )

}


export default Image;