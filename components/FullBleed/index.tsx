// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import {ImageWrapper}  from 'components/mdxComponents/Image'
const FullBleed = ({ children, aspectRatio, ...delegated }) => {    
    return <Wrapper {...delegated}>{children}</Wrapper>;
};


const Wrapper = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  transform: -50vw;

  @media (min-width: 1084px) {
    & {
        left: calc((100% + 250px) / 2);
        transform: translateX(calc(-50vw + 10px));
    }
  }

  & ${ImageWrapper} {
     aspect-ratio: ${props=>{
        return `${props.aspectRatio}` || 16/9
      }};
  }
`;

export default FullBleed;