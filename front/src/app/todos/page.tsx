"use client";

import Link from 'next/link';
import { useFetchTodos } from "@/app/lib/action";

export default function Page() { 
  const { todos } = useFetchTodos();
  // const [title, setTitle] = useState<string>('');
  // const [content, setContent] = useState<string>('');

  // const handleSubmit = async (e: React.FormEvent) => { 
  //   e.preventDefault();
  //   fetch('http://localhost:3000/todos', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ title, content }),
  //   }).then(() => {
  //     fetchTodos();
  //     setTitle('');
  //     setContent('');
  //   }).catch((error) => {
  //     console.error('Error:', error);
  //    });
  // };

  return (
    <div>
      <h1>Todo一覧</h1>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.content}</p>
            <Link href={`/todos/${todo.id}`}>詳細</Link>
          </div>
        );
      }
      )}
      {/* <div>
        <form
          action=""
          onSubmit={handleSubmit}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder='タイトル'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="" />
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            placeholder=''
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="" />
          <button type="submit">送信</button>
        </form>
      </div> */}
    </div>
  );
}