// @ts-nocheck
import { replaceProperty, pick } from "@arcath/utils";
import  React, { useState }  from "react";
import Layout from "components/layout";
import { getPostFromTitle, getPosts } from "lib/data/posts";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { FC } from "react";
import { POST } from "components/postCard";
import MdxPage from 'components/mdxPage'
import axios from "axios";
import useLocalStorange from "hooks/usels";
interface ArticlePost extends POST {
  tags: string[];
}
export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ year: string; month: string; title: string }>) => {
  if (params.year && params.month && params.title) {
    const post = getPostFromTitle(params.year, params.month, params.title);
    
    const source = await post.bundle;
    
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
            "type"
          ]),
          "date",
          (date) => date.toISOString()
        ),
        source
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
  const [data] = useLocalStorange(["userId"])
  // const like = ()=>{
  //   axios('/api/article/like', {
  //     method: "POST",
  //     data: {
  //       userid: data.userId,
  //       articleId: post.title,
  //       likenum: 5
  //     }
  //   })
  // }

  useEffect(()=>{
    axios('/api/article/read', {
      method: "POST",
      data: {
        userid: data.userId,
        articleId: post.title
      }
    })
  }, [])
  return (
    <Layout title={post.title} description={post.lead} >
      <MdxPage source={source.code} post={post} toc={source.toc} />
    </Layout>
  );
};

export default Article;
