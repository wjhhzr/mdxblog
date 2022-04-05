import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

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
          <Link href="/">
            <a>回到首页</a>
          </Link>
        </p>
      </MaxWidthWapper>
    </Layout>
  );
};

export default NotFoundPage;
