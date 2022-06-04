import styled from 'styled-components';


export const Content = styled.div`

`;

export const HeaderSectionTitle= styled.h2`
    font-size: calc(1rem);
    color: var(--color-secondary);
    font-weight: var(--font-weight-medium);
    text-transform: uppercase;
    letter-spacing: 2px;
`;

const MaxWidthWapper = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
`;

export const ArticleList = styled.article`
    
`;

export default MaxWidthWapper
