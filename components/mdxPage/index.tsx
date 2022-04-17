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
import AddCommentCard from "components/addComment";
import Empty from "components/empty";
export const TocContext = React.createContext({});
const MdxPage = ({
  post,
  toc,
  source,
  comments,
}: {
  post: any;
  source: string;
  toc?: {
    level: number;
    id: string;
  }[];
  comments?: {
    articleId: string;
    name: string;
    email: string;
    content: string;
    date: string;
  }[];
}) => {

  const [curIndex, setCurIndex] = useState<string>(() => toc && toc?.[0]?.id);
  const [observer, setObserver] = useState<IntersectionObserver>();
  const [comment, SetComments] = useState(comments)
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

  function addComment (newComment){
    let newComments = [...comment];
    newComments.unshift(newComment)
    SetComments(newComments)
  } 

  return (
    <>
      <PostHeaderWrapper style={{ "--top-padding": "128px" }}>
        <PostTagRow>
          {post?.tags?.map((tag) => (
            <PostTag key={tag}>{tag}</PostTag>
          ))}
        </PostTagRow>
        <LargeTitle>{post?.title}</LargeTitle>
      </PostHeaderWrapper>
      <MaxWidthWapper>
        <TocContext.Provider value={{ observer }}>
          <PostWrapper>
            <MDX source={source} />
          </PostWrapper>
          {toc && (
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
      </MaxWidthWapper>
      {false && (
        <CommentWrapper>
          <MaxWidthWapper style={{ flexDirection: "column" }}>
            <CommentWrapper>
              <ArticleHeading level={2}>最新评论</ArticleHeading>
              { comment.length > 0 ? comment.map((c) => {
                const { name, content, date } = c;
                return (
                  <CommentItemWrapper key={date} >
                    <CommentName>{name}</CommentName>
                    <CommentContent>{content}</CommentContent>
                    <TimeTip>{timeConver(date)}</TimeTip>
                  </CommentItemWrapper>
                );
              }): <Empty description="没有评论，赶紧的！" />}
              <AddCommentCard id={post.title}  setComments={addComment} />
            </CommentWrapper>
          </MaxWidthWapper>
        </CommentWrapper>
      )}
    </>
  );
};

export default MdxPage;
