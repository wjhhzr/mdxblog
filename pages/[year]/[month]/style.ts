// @ts-nocheck
import styled from "styled-components";

const PostHeaderWrapper = styled.div`
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
`;

export const PostWrapper = styled.article`
  padding-bottom: 50px;
  max-width: 675px;
  margin: auto;
  width: inherit;

  p {
    font-size: calc(1.1875rem);
    margin-bottom: 32px;
  }

  code:not(pre > code) {
    position: relative;
    display: inline;
    font-family: var(--font-family-mono);
    font-size: 0.9em;
    padding: 4px 6px;
    background: rgba(115, 125, 140, 0.17);
    border-radius: 3px;
    -webkit-box-decoration-break: clone;
    font-size: calc(1.1875rem);
  }

  h2 {
    font-size: calc(2rem);
    color: var(--color-tertiary);
    margin-top: 64px;
    margin-bottom: 16px;
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

export default PostHeaderWrapper;