"use client";
import Link from 'next/link';
import { useCreateTodo, useFetchTodos } from "@/app/lib/action";
// import { useRouter } from 'next/navigation';

export default function Page() { 
  const { todos, loading, error } = useFetchTodos();
  const { title, setTitle, content, setContent, loading: createLoading, error: createError, handleSubmit } = useCreateTodo();
  // const router = useRouter();

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}というエラーが発生しています！</div>;
  if (createLoading) return <div>データ反映中</div>;
  if (createError) return <div>{createError.message}というエラーが発生しています！</div>;
  if (todos.length === 0) return <div>データがありません</div>;

  return (
    <div>
      <h1>Todo一覧</h1>
      {todos.map((todo) => {
        return (
          <div key={todo.id}
          className="flex justify-between items-center bg-red-100 m-1">
            <h2 className="text-xs">{todo.title}</h2>
            <p className="text-xs">{todo.content}</p>
            <Link
              href={`/todos/${todo.id}`}
              className="text-xs"
            >詳細</Link>
          </div>
        );
      }
      )}
      <div>
        <form onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center">
          <label htmlFor="title">TItle</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="m-1 border border-gray-300"
          />
          <label htmlFor="content">Content</label>
          <textarea
            name='content'
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="m-1 border border-gray-300"
          />
          <button
            type="submit"
            className="m-1 bg-blue-500 text-white hover:bg-blue-700"
          >Add Todo</button>
        </form>
      </div>
    </div>
  );
}