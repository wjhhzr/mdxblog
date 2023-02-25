// @ts-nocheck
import React, { useEffect } from "react";
import { NextPage, InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Layout from "components/layout";
// import MaxWidthWrapper from "./style";
import axios from "axios";
import TimeLine from "components/timeLine";
import dayjs from "dayjs";
import Introduce from "components/introduce";
import useIntroduce from "src/hooks/useIntroduce";
import MaxWidthWrapper from "components/maxWidthWrapper";
import Mongo from "lib/db/mongo";
import updataLog from "../../lib/db/updatelog";

const Item = TimeLine.Item

export const getStaticProps = async ({ }: GetStaticPropsContext) => {
    // 先更新日志
    process.env.NODE_ENV !== "development" && await updataLog()
    // 查询mongo，静态渲染
    const mongo = new Mongo({
        dbUrl: process.env.DB,
        database: "blog",
        collection: "updateLog"
    })
    const logs = await mongo.query({})
    return {
        props: {
            logs: logs?.map(item=>{
                delete item._id
                return item
            }) || []
        },
    };
};

const LogsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    logs
}) => {
    const { title, labels } = useIntroduce();    
    return (
        <Layout title="更新日志">
            <MaxWidthWrapper>
                <Introduce title={title} labels={labels} />
                {
                    logs && <TimeLine style={{ marginTop: 50 }} >
                        {logs.map(({ hash, date, message, author_name }, index) => {
                            return !message.includes("fix") && <Item key={hash} time={dayjs(date).format("YYYY-MM-DD HH:mm")} label={message + "-" + author_name} />
                        })}
                    </TimeLine>
                }
            </MaxWidthWrapper>
        </Layout>
    );
};

export default LogsPage;
