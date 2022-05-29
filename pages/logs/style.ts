import styled from "styled-components";

 const MaxWidthWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;
`;



export const ContentPrivew = styled.div`
  background: var(--color-subtle-background);
  padding: 32px;
  border-radius: 8px;
`; 

export default MaxWidthWrapper
