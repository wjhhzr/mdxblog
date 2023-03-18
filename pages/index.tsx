// @ts-nocheck
import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import React, { useEffect } from "react";
import { replaceProperty } from "@arcath/utils/lib/functions/replace-property";
import { asyncMap } from "@arcath/utils/lib/functions/async-map";
import { pick } from "@arcath/utils/lib/functions/pick";
import { getPosts } from "src/lib/data/posts";
import Layout from "src/components/layout";
import { HeaderSectionTitle, ArticleList } from "./style";
import Spacer from "src/components/spacer";
import PostCard from "src/components/postCard";
import { POST } from "src/components/postCard";
import Introduce from "src/components/introduce";
import useIntroduce from "src/hooks/useIntroduce";
import MaxWidthWrapper from "src/components/maxWidthWrapper";
export const getStaticProps = async ({}: GetStaticPropsContext) => {

  const posts = await asyncMap(await getPosts({
    limit: false
  }), async (post) => {
    const info = replaceProperty(
      pick(await post.data, [
        "slug",
        "title",
        "href",
        "year",
        "month",
        "date",
        "lead",
      ]),
      "date",
      (date) => date.toISOString()
    );
    return info;
  });
  return {
    props: { posts },
  };
};
const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}: {
  posts: POST[];
}) => {
  const { title, labels } = useIntroduce();
  return (
    <Layout>
      <MaxWidthWrapper>
        <Introduce title={title} labels={labels} />
        <HeaderSectionTitle>最新发布</HeaderSectionTitle>
        <Spacer height={36} />
        <ArticleList>
          {posts?.map((post) => (
            <PostCard key={post.date} post={post} />
          ))}
        </ArticleList>
      </MaxWidthWrapper>
    </Layout>
  );
};

export default Home;
