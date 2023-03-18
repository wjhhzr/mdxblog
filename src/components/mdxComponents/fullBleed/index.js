import React from 'react';
import styled from 'styled-components';
import {ImageWrapper}  from 'src/components//mdxComponents/Image'
const FullBleed = ({ children, ...delegated }) => {
  return <Wrapper {...delegated}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  left: 50%;
  margin-left: -50vw;

  @media (min-width: 1084px) {
    & {
      left: calc((100% + 250px) / 2);
      margin-left: calc(-50vw);
    }
  }

  & ${ImageWrapper} {
     aspect-ratio: ${({aspectRatio})=>`${aspectRatio}` || 16/9};
     padding:${({aspectRatio})=>`calc(100% / ${aspectRatio} / 2) 0`};
  }
`;

export default FullBleed;