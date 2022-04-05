import Spacer from "components/spacer";
import { FC } from "react";
import {CardWrapper, HeaderTitle, Introduce, ReadMore} from './style'
import React from "react";

export interface POST {
  date?: string;
  href?: string;
  lead?: string;
  month?: number;
  slug?: string;
  title: string;
  year?: string;
}

const PostCard: FC<{ post: POST }> = ({ post }) => {
  return <CardWrapper href={post.href} >
      <HeaderTitle>{post.title}</HeaderTitle>
      <Introduce>{post.lead}</Introduce>
      <Spacer height={16}  />
      <ReadMore>阅读更多</ReadMore>
  </CardWrapper>;
};

export default PostCard;
