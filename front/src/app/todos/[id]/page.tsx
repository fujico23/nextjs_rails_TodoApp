"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Todo } from "@/types/Todo";
import Link from "next/link";

export default function Page() { 
  const currentPath = usePathname();
  const id = currentPath.split("/")[2];
  const [todo, setTodos] = useState<Todo | null>(null);
  const fetchTodos = async () => {
    const response = await fetch(`http://localhost:3000/todos/${id}`);
    const todo: Todo = await response.json();
    setTodos(todo);
  } 
  useEffect(() => { 
    fetchTodos();
  }, [id]);
  return (
    <div>
      {todo?.title}
      {todo?.content}
      <Link href="/todos">一覧に戻る</Link>
    </div>
  );
}