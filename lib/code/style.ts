import styled from "styled-components";

// 最外层代码容器
export const CodeSnippetOuterWrapper = styled.div`
  position: relative;
  margin: 48px auto;
`;

// 代码语言的容器
export const StaticCodeWrapperLanguage = styled.div`
  position: absolute;
  z-index: 2;
  top: 0px;
  right: 14px;
  transform: translateY(-100%);
  font-size: 18px;
  padding: 2px 12px 0px;
  background: var(--syntax-bg);
  border-radius: 8px 8px 0px 0px;
  text-transform: uppercase;
  color: var(--color-gray-700);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family);
  pointer-events: none;
`;

// 代码容器
export const StaticCodeWrapper = styled.div`
  position: relative;
  display: flex;
  font-family: var(--font-family-mono);
  font-size: 18px;
  outline-offset: 2px;
  overflow: auto;
  margin-left: -32px;
  margin-right: -32px;
  padding: 32px;
  background: var(--syntax-bg);

  @media (min-width: 564px) {
    border-radius: 6px;
    max-width: calc(100% + 64px);
  }
`;

export const StaticCodeSnippetInertEditor = styled.div`
  textarea {
    display: none !important;
  }

  pre {
    margin: 0px;
    border: 0px;
    background: none;
    box-sizing: inherit;
    display: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-variant-ligatures: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    tab-size: inherit;
    text-indent: inherit;
    text-rendering: inherit;
    text-transform: inherit;
    white-space: pre-wrap;
    word-break: keep-all;
    overflow-wrap: break-word;
    position: relative;
    pointer-events: none;
    padding: 10px;
  }
`;

// 代码片段
export const StaticCodeSnippet = styled.div``;

// 代码行
export const CodeLine = styled.div`
  color: var(--syntax-txt);
  padding: 0px;
  font-family: var(--font-family-mono);
  font-weight: var(--font-weight-medium);
  white-space: pre;
`;
