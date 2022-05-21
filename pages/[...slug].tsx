// @ts-nocheck
import { pick } from "@arcath/utils";
import Layout from "components/layout";
import MdxPage from "components/mdxPage";
import { getPageBySlug, getPages } from "lib/data/pages";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import React from "react";

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string[] }>) => {
  if (params?.slug) {
    const page = getPageBySlug(params.slug[0]);

    const source = await page.bundle;

    return {
      props: {
        page: pick(await page.data, ["title", "slug"]),
        source,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages({ limit: false });

  const paths = pages.map(({ properties }) => {

    return { params: { slug: [properties.slug] } };
  });


  return {
    paths,
    fallback: false,
  };
};

const SlugPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  page,
  source,
}) => {
  return (
    <Layout title={page.title} description={page.title} >
      <MdxPage source={source.code} post={page} />
    </Layout>
  );
};

export default SlugPage;
