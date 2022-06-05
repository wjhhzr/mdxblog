// @ts-nocheck
import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import React from "react";
import { replaceProperty } from "@arcath/utils/lib/functions/replace-property";
import { asyncMap } from "@arcath/utils/lib/functions/async-map";
import { pick } from "@arcath/utils/lib/functions/pick";
import { getPosts } from "lib/data/posts";
import Layout from "components/layout";
import MaxWidthWapper, { HeaderSectionTitle, ArticleList } from "./style";
import Spacer from "components/spacer";
import PostCard from "components/postCard";
import { POST } from "components/postCard";
import Introduce from "components/introduce";
import useIntroduce from "src/hooks/useIntroduce";
const fetcher = (url) => fetch(url).then((res) => res.json())
export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const posts = await asyncMap(await getPosts(), async (post) => {
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
      <MaxWidthWapper>
        <Introduce title={title} labels={labels} />
        <HeaderSectionTitle>最新发布</HeaderSectionTitle>
        <Spacer height={36} />
        <ArticleList>
          {posts?.map((post) => (
            <PostCard key={post.date} post={post} />
          ))}
        </ArticleList>
      </MaxWidthWapper>
    </Layout>
  );
};

export default Home;
