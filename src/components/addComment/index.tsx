// @ts-nocheck
import React, { useEffect, useState } from "react";
import { AddCommentCard } from "./style";
import { ArticleHeading } from "src/components/mdxComponents";
import axios from "axios";
import { useRef } from "react";
import { useSWRConfig } from "swr";
import useLocalStorange from "src/hooks/usels";
import dayjs from "dayjs";
import  message  from "antd/lib/message/index";
import Form from 'antd/lib/form'
function AddComment({ id }: { setComments?: any; id: string }) {
  const [form] = Form.useForm()
  const formRef = useRef();
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const [userCache, setUserCache] = useLocalStorange(["name", "email"]);
  useEffect(()=>{
    form.setFieldsValue({
      name: userCache.name,
      email: userCache.email
    })
  },[userCache, form])
  // 提交留言
  async function submit() {
    await form.validateFields()
    const {content, name, email} = form.getFieldsValue();
    setLoading(true);
    const user = { ...userCache, name: name.value, email: email.value };
    await axios.post("/api/comments/add", {
      content: content.value,
      articleId: id,
      ...user,
      date: dayjs()
    });
    // 保存用户
    setUserCache(user);
    form.setFieldsValue({
      content: ""
    })
    message.success("评论成功！")
    await mutate(`/api/comments/${id}`);
    setTimeout(()=>setLoading(false),500)
  }
  return (
    <AddCommentCard>
      <ArticleHeading level={3}>发表你的看法</ArticleHeading>
      <p className="comment-tip">请遵守国际惯例，文明友好，和谐发言</p>
      <Form form={form} className="comment-form" id="comment">
        <Form.Item rules={[{required: true, message: "说点什么吧！"}]} name="content" label="评论内容" >
          <textarea
            name="content"
            rows={5}
            placeholder="你的想法或意见"
            required
          />
        </Form.Item>
        <Form.Item name="name" rules={[{required: true, message: "起个名字吧！"}]} label="昵称" >
          <input
            name="name"
            placeholder="如何称呼你？"
            defaultValue={userCache.user}
            required
          />
        </Form.Item>
        <Form.Item name="email" rules={[{required: true, message: "请输入邮箱哦"}, {
          pattern: /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,
          message:"请输入正确的邮箱，以方便我回复！"
        }]} label="邮箱(不会公开)" >
          <input
            placeholder="您的邮箱"
            defaultValue={userCache.email}
            required
          />
        </Form.Item>
      </Form>
      <div className="submit-row">
        <button
          onClick={submit}
          disabled={loading}
          className="submit"
          value="Post Comment"
        >
          提{"  "}交
        </button>
      </div>
    </AddCommentCard>
  );
}

export default AddComment;
