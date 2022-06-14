import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import RouterLink from "components/RouterLink";
import Layout from "components/layout";
import MaxWidthWapper from "./style";

const NotFoundPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Error 404 / Page Not Found</title>
      </Head>
      <MaxWidthWapper>
        <h1>404</h1>
        <p>
          <i>没有找到页面~</i>
        </p>
        <p>
          <RouterLink href="/">
            回到首页
          </RouterLink>
        </p>
      </MaxWidthWapper>
    </Layout>
  );
};

export default NotFoundPage;
