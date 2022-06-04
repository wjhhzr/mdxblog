import styled from "styled-components";

export const HeaderTitle = styled.h3`
  font-weight: var(--font-weight-bold);
  font-size: 22px;
  color: var(--color-gray-1000);
`;

export const CardWrapper = styled.a`
  position: relative;
  display: block;
  text-decoration: none;
  color: var(--color-text);
  cursor: pointer;
  &:not(:first-child) {
    margin-top: 48px;
  }

  &:hover ${HeaderTitle} {
      color:  var(--color-primary);
  }
`;



export const Introduce = styled.p`
  font-size: 14px;
  margin-top: 16px;
`;

export const ReadMore = styled.div`
  font-size: 14px;
  font-weight: var(--font-weight-bold);
`;
