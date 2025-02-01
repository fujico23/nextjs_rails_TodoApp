"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const currentPath = usePathname();
  const id = currentPath.split("/")[2];
  const router = useRouter();
  
  const fetchTodo = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`);
      if (!res.ok) {
        throw new Error('エラーが発生しました');
      }
      const json = await res.json();
      setTitle(json.title);
      setContent(json.content);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error : new Error(String(error)));
    }
    setLoading(false);
  }, [id]);
  useEffect(() => {
    if (id) {
      fetchTodo();
    }
  }, [id]);
  
  const handleEditForm = async(e: React.FormEvent) => {
    e.preventDefault();
    try { 
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      router.push(`/todos`);
    } catch (error) { 
      console.error(error);
      setError(error instanceof Error ? error : new Error(String(error)));
    }
  }

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}というエラーが発生しています！</div>;

  return (
    <div>
      <form onSubmit={handleEditForm}>
        <label
          htmlFor="title">title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          id="title"
          value={title}
          className=""
        />
        <label htmlFor="context">Content</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          name="context"
          id="context"
          value={content}>
        </textarea>
        <button type="submit">編集</button>
      </form>
    </div>
  );
}