// @ts-nocheck
import React, { useEffect, useState } from "react";
import { AddCommentCard } from "./style";
import { ArticleHeading } from "src/components/mdxComponents";
import axios from "axios";
import { useRef } from "react";
import { useSWRConfig } from "swr";
import useLocalStorange from "src/hooks/usels";
function AddComment({ id }: { setComments?: any; id: string }) {
  const formRef = useRef();
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const [userCache, setUserCache] = useLocalStorange(["name", "email"]);

  // 提交留言
  async function submit() {
    const [content, name, email] = formRef.current;
    if (!content.value) return;
    if (!name.value) return;
    if (!email.value) return;
    setLoading(true);
    const user = { ...userCache, name: name.value, email: email.value };
    await axios.post("/api/comments/add", {
      content: content.value,
      articleId: id,
      ...user,
    });
    // 保存用户
    setUserCache(user);
    await mutate(`/api/comments/${id}`);
    setTimeout(()=>setLoading(false),500)
  }
  return (
    <AddCommentCard>
      <ArticleHeading level={3}>发表你的看法</ArticleHeading>
      <p className="comment-tip">请遵守国际惯例，文明友好，和谐发言</p>
      <form className="comment-form" id="comment" ref={formRef}>
        <div className="item-wrapper">
          <label className="item-label">内容</label>
          <textarea
            name="content"
            rows={5}
            placeholder="你的想法或意见"
            required
          />
        </div>
        <div className="item-wrapper">
          <label className="item-label">昵称</label>
          <input
            name="name"
            placeholder="如何称呼你？"
            defaultValue={userCache.name}
            required
          />
        </div>
        <div className="item-wrapper">
          <label className="item-label">邮箱(不会公开)</label>
          <input
            name="email"
            placeholder="您的邮箱"
            defaultValue={userCache.email}
            required
            pattern="^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$"
          />
        </div>
      </form>
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
