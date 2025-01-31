"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const currentPath = usePathname();
  const id = currentPath.split("/")[2];
  console.log(id);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
  const fetchTodo = async () => {
    const response = await fetch(`http://localhost:3000/todos/${id}`);
    const todo = await response.json();
    setTitle(todo.title);
    setContent(todo.content);
  }
    if (id) {
      fetchTodo();
    }
  }, [id]);
  
  const handleEditForm = () => {
    // e.preventDefault();
    fetch(`http://localhost:3000/todos/${id}`, {
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
  }

  return (
    <div>
      <form onSubmit={handleEditForm}>
        <label htmlFor="title">title</label>
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