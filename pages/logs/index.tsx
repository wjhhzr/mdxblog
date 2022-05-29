// @ts-nocheck
import React from "react";
import { NextPage, InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Layout from "components/layout";
import MaxWidthWrapper, { CardListWrapper } from "./style";
import axios from "axios";
import TimeLine from "components/timeLine";
import dayjs from "dayjs";
import  Introduce  from "components/introduce";

const Item = TimeLine.Item

export const getStaticProps = async ({ }: GetStaticPropsContext) => {
    const logs = (await axios.get(`${process.env.API_HOST}/blog/gitlog/getLogs`))?.data
    return {
        props: {
            logs,
        },
    };
};

const LogsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    logs,
}) => {
    console.log(logs);
    return (
        <Layout title="更新日志">
            <Introduce title="点点滴滴，都在这小小的博客里！这里有" texts={["生活", "创意", "成长"]}  />
            <MaxWidthWrapper>
                {
                    logs && <TimeLine style={{marginTop: 50}} >
                        {logs.map(({ hash, date, message, author_name }, index) => {
                            if (message.includes("fix")) {
                                return ""
                            }
                            return <Item key={hash} time={dayjs(date).format("YYYY-MM-DD HH:mm:ss")} label={message + "-" + author_name} />
                        })}
                    </TimeLine>
                }
            </MaxWidthWrapper>
        </Layout>
    );
};

export default LogsPage;
