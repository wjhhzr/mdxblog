import { mobileBreakpoint } from "src/lib/function/cssMixins";
import styled from "styled-components";


export const PostHeaderWrapper = styled.div`
  padding: var(--top-padding) 32px 96px 32px;
  text-align: center;
`;

export const PostTagRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const PostTag = styled.span`
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  margin-bottom: 16px;
`;

export const LargeTitle = styled.h1`
  font-size: calc(2.375rem);
  color: var(--color-gray-1000);
  line-height: 1.3;
  ${mobileBreakpoint("font-size: calc(2rem);")}
`;

export const Slider = styled.aside`
  flex: 0 100000 250px;
  display: none;
  
  
  padding-bottom: 16px;
  margin-left: auto;
  margin-top: 4px;

  @media (min-width: 1084px) {
    & {
      display: block;
    }
  }

`;

export const TocWrapper = styled.nav`
  position: sticky;
  top: 100px;
  overflow: auto;
  max-height: calc(100vh - 120px);
  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--color-gray-300);
  }
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: transparent;
  }
`;

export const TocTitle = styled.h2`
  font-size: calc(1rem);
  color: var(--color-gray-900);
  margin-bottom: 16px;
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const ContentLink = styled.a`
  margin-left: ${(props) => `calc(20px * ${props["data-level"] - 2})`};
  display: block;
  text-decoration: none;
  opacity: 0.7;
  margin-top: 10px;
  transition: opacity 500ms ease 0;
  color: var(--color-gray-800);
  &:hover,
  &:focus {
    opacity: 1;
  }
`;

export const PostWrapper = styled.article<{full:string}>`
  ${({full})=> full ? "max-width: 100%;": "max-width: 675px;"}
  margin: auto;
  width: inherit;

  code:not(pre > code) {
    position: relative;
    display: inline;
    font-family: var(--font-family-mono);
    font-size: 0.9em;
    padding: 4px 6px;
    background: var(--color-gray-100);
    border-radius: 3px;
    -webkit-box-decoration-break: clone;
    font-size: calc(1.1875rem);
    margin: 0 4px;
  }

  h2::after {
    position: absolute;
    content: "";
    left: -15px;
    top: 50%;
    background: var(--color-primary);
    width: 4px;
    height: 70%;
    transform: translateY(-50%);
    border-radius: 0 4px 4px 0;
    box-shadow: 1px 0px 5px var(--color-primary);
  }

  iframe {
    width: 100%;
    aspect-ratio: 16/10;
  }

  img {
    display: block;
    width: 100%;
    border-radius: 3px;
    border: 1px solid var(--color-gray-200);
    margin: 32px auto;
  }
`;


export const CommentWrapper = styled.div`
  h2, h3 {
    margin-top:0 ;
    color: var(--color-secondary);
  }
`;

export const CommentItemWrapper = styled.div`
  /* border-bottom:1px solid var(--color-gray-200) ; */
  padding: 20px 10px;
  display:grid;
  grid-template-areas: "writer writer" 
  "time space"
  "content content";
  border-radius: 5px;
  &:hover {
    background: var(--color-gray-100);
  }
`;
export const CommentName = styled.div`
  font-weight: var(--font-weight-bold);
  grid-area: writer;
  color:var(--color-primary);
`;
export const CommentContent = styled.p`
  grid-area: content;
  margin-top: 10px;
  word-break: break-all;
`;

export const TimeTip = styled.div`
  display: flex;
  grid-area: time ;
  justify-self: left;
  color: var(--color-gray-700);
`;