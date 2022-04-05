import React from "react";
import styled, { css } from "styled-components";

interface ListProps {
  isOl: boolean;
}

const ListItemWrapper = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;

  p{
      margin: 0;
  }
`;

const ListItemIcon = styled.span`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding-right: 16px;
  padding-top: 0px;
  color: var(--color-primary);
  transform: translateY(5px);
`;

const ListItemContent = styled.div`
  flex: 1 1 0%;
`;

const ListWrapper = styled.div<ListProps>`
  font-size: 19px;
  margin-bottom: 32px;
  list-style: none;
  /* ul样式 */
  ${props=> !props.isOl && css`padding:0;` }
  /* ol的样式 */
  ${(props) =>
    props.isOl &&
    css`
      --counter-name: counts;
      counter-reset: var(--counter-name);
      & ${ListItemWrapper} {
        counter-increment: var(--counter-name);
        -webkit-box-align: baseline;
        align-items: baseline;
        &::before {
          content: counters(var(--counter-name), ".") ". ";
          font-feature-settings: "tnum";
          color: var(--color-primary);
          font-weight: var(--font-weight-medium);
          padding-right: 12px;
        }
      }

      & ${ListItemIcon} {
        display: none;
      }
    `}
`;

interface IPropsList {
  type: "ol" | "ul";
  children: React.ReactNode;
}

interface IPropsListItem {
  content: React.ReactNode;
}

function List({ type, children }: IPropsList) {
  return (
    <ListWrapper as={type} isOl={type === "ol"}>
      {children}
    </ListWrapper>
  );
}

const ListItem = ({ children }) => {
  return (
    <ListItemWrapper>
      <ListItemIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </ListItemIcon>
      <ListItemContent>{children}</ListItemContent>
    </ListItemWrapper>
  );
};

List.Item = ListItem;

export default List;
