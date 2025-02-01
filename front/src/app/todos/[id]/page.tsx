"use client";
import Link from "next/link";
import { useFetchTodo } from "@/app/lib/action";

export default function Page() { 
  const { todo, loading, error, id } = useFetchTodo();

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}というエラーが発生しています！</div>;
  if (!todo) return <div>データがありません</div>;

  return (
    <div className="flex items-center justify-center flex-col w-96 
    h-96 mx-auto my-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl pb-2">{todo.title}</h1>
      <p className="text-xl">{todo.content}</p>
      <Link
        href={`/todos/${id}/edit`}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        編集
      </Link>
      <Link
        href="/todos"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        TOP一覧
      </Link>
    </div>
  );
}