// @ts-nocheck
import React, { useEffect } from "react";
import { NextPage, InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Layout from "src/components/layout";
// import MaxWidthWrapper from "./style";
import axios from "axios";
import TimeLine from "src/components/timeLine";
import dayjs from "dayjs";
import Introduce from "src/components/introduce";
import useIntroduce from "src/hooks/useIntroduce";
import MaxWidthWrapper from "src/components/maxWidthWrapper";
import mongo from "src/lib/db/mongo";
import updataLog from "../../lib/db/updatelog";
import { COLLECTIONS } from "src/constants";


const Item = TimeLine.Item

export const getStaticProps = async ({ }: GetStaticPropsContext) => {
    // 查询mongo，静态渲染
    mongo.setCollection(COLLECTIONS.updateLog)
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
