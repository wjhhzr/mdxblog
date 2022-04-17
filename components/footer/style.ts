import styled from "styled-components";

export const FooterWapper = styled.div`
  background: linear-gradient(
    0deg,
    var(--color-homepage-light),
    var(--color-homepage-dark)
  );
`;

export const FooterLeft = styled.div``;
export const FooterRight = styled.div`
    display: flex;
`;

export const FooterThanks = styled.div`
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  margin-top: 8px;
`;

export const FooterTop = styled.div``;

export const FooterBottom = styled.div`
  margin-top: 50px;
  font-size: 12px;
  color: var(--color-gray-700);
  @media (max-width: 768px){
      & {
        margin-top: 0px;
      }
    }
`;

export const FooterColumn = styled.div`
    margin-left: 96px;
    padding-top: 8px;
    @media (max-width: 768px){
      & {
        margin-left: 0px;
      }
    }
`;

export const FooterHeading = styled.p`
  font-size: 14px;
  font-weight: var(--font-weight-light);
  color: var(--color-gray-700);
`;

export const FooterColumnChildren = styled.div`
  display: grid;
  width: 100px;
  grid-template-columns: 1fr;
  gap: 6px;
  padding-top: 12px;
  a {
    font-size: 14px;
    font-weight: var(--font-weight-light);
    color: var(--color-text);
    text-decoration: none;
  }
`;

export const MaxWidthWapper = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding-top: 32px;
  padding-bottom: 32px;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;
  @media (max-width: 768px){
    & {
      ${props=>props.media && "flex-direction: column" }
      /* flex-direction: column; */
    }
  }
`;
