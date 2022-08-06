// @ts-nocheck
import MDX from "components/mdx";
import React, { useEffect, useRef, useState } from "react";
import { timeConver } from "lib/function/timeConver";
import {
  PostHeaderWrapper,
  PostTagRow,
  PostTag,
  LargeTitle,
  PostWrapper,
  Slider,
  TocTitle,
  TocWrapper,
  ContentLink,
  MaxWidthWapper,
  CommentWrapper,
  CommentContent,
  CommentItemWrapper,
  CommentName,
  TimeTip,
} from "./style";
import { ArticleHeading } from "components/mdxComponents";
import MaxWidthWrapper from "components/maxWidthWrapper";
import AddCommentCard from "components/addComment";
import MobileToc from "components/mobileToc";
import Empty from "components/empty";
import useSWR from "swr";
import { useRouter } from "next/router";
export const TocContext = React.createContext({});
const fetcher = (url) => fetch(url).then((res) => res.json());

interface IComments {
  articleId: string;
  name: string;
  email: string;
  content: string;
  date: string;
}
[];

const MdxPage = ({
  post,
  toc,
  source,
}: {
  post: any;
  source: string;
  toc?: {
    level: number;
    id: string;
  }[];
}) => {
  const { query } = useRouter();
  const { data: comments = [], error } = useSWR(
    () => query.title && `/api/comments/${query.title}`,
    fetcher
  );
  const hasComments = comments.length > 0;
  const [curIndex, setCurIndex] = useState<string>(() => toc && toc?.[0]?.id);
  const [observer, setObserver] = useState<IntersectionObserver>();
  const timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    let o = new IntersectionObserver((entries) => {
      entries.map((entry) => {
        if (entry.intersectionRatio > 0) {
          // resolve render too more
          timer.current && clearTimeout(timer.current);
          timer.current = setTimeout(() => {
            setCurIndex(entry.target?.id);
          }, 500);
        }
      });
    });
    setObserver(o);
    return () => {
      o && o.disconnect();
    };
  }, []);
  return (
    <>
      {!(post?.type === "photo") && toc?.length > 0 && <MobileToc tocs={toc} curToc={curIndex} />}
      <PostHeaderWrapper style={{ "--top-padding": "128px" }}>
        <PostTagRow>
          {post?.tags?.map((tag) => (
            <PostTag key={tag}>{tag}</PostTag>
          ))}
        </PostTagRow>
        <LargeTitle>{post?.title}</LargeTitle>
      </PostHeaderWrapper>
      <MaxWidthWrapper style={{display: "flex"}} >
        <TocContext.Provider value={{ observer }}>
          <PostWrapper full={post?.type === "photo"} >
            <MDX source={source} type={post.type} />
          </PostWrapper>
          {!(post?.type === "photo") && toc?.length > 0 && (
            <Slider>
              <TocWrapper>
                <TocTitle>文章目录</TocTitle>
                {toc.map((t, index) => {
                  const { id, level } = t;
                  return (
                    <ContentLink
                      key={id}
                      href={`#${id}`}
                      data-level={level}
                      style={{
                        color: id === curIndex && "var(--color-primary)",
                      }}
                    >
                      {id}
                    </ContentLink>
                  );
                })}
              </TocWrapper>
            </Slider>
          )}
        </TocContext.Provider>
      </MaxWidthWrapper>
      <CommentWrapper>
        <MaxWidthWrapper style={{ display: "flex",flexDirection: "column" }}>
          <CommentWrapper>
            <AddCommentCard id={post.title} />
            <ArticleHeading level={2}>最新评论</ArticleHeading>
            {hasComments &&
              comments.map(({ name, content, date }) => (
                <CommentItemWrapper key={date}>
                  <CommentName>{name}</CommentName>
                  <CommentContent>{content}</CommentContent>
                  <TimeTip>{timeConver(date)}</TimeTip>
                </CommentItemWrapper>
              ))}
            {!hasComments && (
              <Empty description="感谢阅读，这篇文章还没有评论，欢迎发表意见！" />
            )}
          </CommentWrapper>
        </MaxWidthWrapper>
      </CommentWrapper>
    </>
  );
};

export default MdxPage;
