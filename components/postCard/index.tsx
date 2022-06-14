import Spacer from "components/spacer";
import { FC } from "react";
import styled from "styled-components";
import React from "react";
import RouterLink from "components/RouterLink";
import Link from "next/link";
export interface POST {
  date?: string;
  href?: string;
  lead?: string;
  month?: number;
  slug?: string;
  title: string;
  year?: string;
}

export const HeaderTitle = styled.h3`
  font-weight: var(--font-weight-bold);
  font-size: 22px;
  color: var(--color-gray-1000);
`;

export const CardWrapper = styled.div`
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

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const Introduce = styled.p`
  font-size: 16px;
  margin-top: 16px;
`;

export const ReadMore = styled.div`
  font-size: 14px;
  font-weight: var(--font-weight-bold);
`;
const PostCard: FC<{ post: POST }> = ({ post }) => {
  return <CardWrapper >
    <Link href={post.href} >
      <a>
        <HeaderTitle>{post.title}</HeaderTitle>
        <Introduce>{post.lead}</Introduce>
        <Spacer height={16} />
        <ReadMore>阅读更多</ReadMore>
      </a>
    </Link>
  </CardWrapper>
};

export default PostCard;
