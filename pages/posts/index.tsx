// @ts-nocheck
import React from "react";
import { NextPage, InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Layout from "components/layout";
import { getPosts, PostFrontmatter, PostProperties } from "lib/data/posts";
import { pick } from "@arcath/utils/lib/functions/pick";
import { replaceProperty } from "@arcath/utils/lib/functions/replace-property";
import { asyncMap } from "@arcath/utils/lib/functions/async-map";
import { ContentPrivew, CardListWrapper } from "./style";
import PostCard from "components/postCard";
import MaxWidthWrapper from "components/maxWidthWrapper";

export const POST_FIELDS: (keyof (PostFrontmatter & PostProperties))[] = [
  "slug",
  "title",
  "href",
  "date",
  "lead",
];

export type PostData = {
  title: string;
  href: string;
  date: string;
  lead: string;
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const postFiles = await getPosts({ limit: false });
  const posts: PostData[] = await asyncMap(postFiles, async (post) => {
    return replaceProperty(pick(await post.data, POST_FIELDS), "date", (date) =>
      date.toISOString()
    );
  });

  return {
    props: {
      posts,
    },
  };
};

const PostsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <Layout title="所有文章">
      <MaxWidthWrapper>
        <CardListWrapper>
          {posts.map((post) => {
            return (
              <ContentPrivew key={post.date}>
                <PostCard post={post} />
              </ContentPrivew>
            );
          })}
        </CardListWrapper>
      </MaxWidthWrapper>
    </Layout>
  );
};

export default PostsPage;
