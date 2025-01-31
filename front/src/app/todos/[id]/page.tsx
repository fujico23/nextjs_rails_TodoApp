"use client";
import Link from "next/link";
import { useFetchTodo } from "@/app/lib/action";

export default function Page() { 
  const { todo, loading, error, id } = useFetchTodo();

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}というエラーが発生しています！</div>;
  if (!todo) return <div>データがありません</div>;

  return (
    <div>
      {todo.title}
      {todo.content}
      <Link href={`/todos/${id}/edit`}>編集</Link>
    </div>
  );
}