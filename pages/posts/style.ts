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

export const CardListWrapper = styled.div`
  padding-top: 128px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 32px;
  @media (max-width: 563px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentPrivew = styled.div`
  background: var(--color-subtle-background);
  padding: 32px;
  border-radius: 8px;
  transition: background 350ms ease 0s;
`;

export default MaxWidthWrapper
