// @ts-nocheck
import { replaceProperty, pick } from "@arcath/utils";
import  React  from "react";
import Layout from "components/layout";
import { getPostFromTitle, getPosts } from "lib/data/posts";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { FC } from "react";
import { POST } from "components/postCard";
import MdxPage from 'components/mdxPage'
import axios from 'axios'
interface ArticlePost extends POST {
  tags: string[];
}
export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ year: string; month: string; title: string }>) => {
  if (params.year && params.month && params.title) {
    const post = getPostFromTitle(params.year, params.month, params.title);
    
    const source = await post.bundle;
    // const comments = (await axios.get(`http://localhost:7000/blog/comments/allComments/${encodeURI(params.title)}`))?.data
    // console.log("评论", comments );
    
    return {
      props: {
        post: replaceProperty(
          pick(await post.data, [
            "title",
            "lead",
            "href",
            "tags",
            "year",
            "month",
            "date",
          ]),
          "date",
          (date) => date.toISOString()
        ),
        source,
        // comments
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts({ limit: false, orderBy: "href" });
  const paths = posts.map(({ properties }) => {
    const { year, month, slug } = properties;

    return {
      params: {
        year,
        month,
        title: slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

const Article: FC<{
    post: ArticlePost;
    source: {
      code:string;
      toc:{
        id:string
        level:number
      }[]
    };
    comments:{
      articleId:string
      name:string
      email:string
      content:string
      date:string
    }[]
  }> = ({
  post,
  source,
  comments=[]
}) => {
  console.log(comments);
  return (
    <Layout title={post.title} description={post.lead} >
      <MdxPage source={source.code} post={post} toc={source.toc}  comments={comments} />
    </Layout>
  );
};

export default Article;
