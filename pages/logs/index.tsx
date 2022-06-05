// @ts-nocheck
import React from "react";
import { NextPage, InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Layout from "components/layout";
import MaxWidthWrapper from "./style";
import axios from "axios";
import TimeLine from "components/timeLine";
import dayjs from "dayjs";
import Introduce from "components/introduce";
import useIntroduce from "src/hooks/useIntroduce";
const Item = TimeLine.Item

export const getStaticProps = async ({ }: GetStaticPropsContext) => {
    console.log("当前请求地址", process.env.API_HOST);
    
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
    const { title, labels } = useIntroduce();    
    return (
        <Layout title="更新日志">
            <MaxWidthWrapper>
                <Introduce title={title} labels={labels} />
                {
                    logs && <TimeLine style={{ marginTop: 50 }} >
                        {logs.map(({ hash, date, message, author_name }, index) => {
                            if (message.includes("fix")) {
                                return ""
                            }
                            return <Item key={hash} time={dayjs(date).format("YYYY-MM-DD HH:mm")} label={message + "-" + author_name} />
                        })}
                    </TimeLine>
                }
            </MaxWidthWrapper>
        </Layout>
    );
};

export default LogsPage;
