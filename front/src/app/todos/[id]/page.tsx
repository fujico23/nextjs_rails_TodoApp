"use client";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Todo } from "@/interfaces/index";
import Link from "next/link";

export default function Page() { 
  const currentPath = usePathname();
  const id = currentPath.split("/")[2];
  const [todo, setTodo] = useState<Todo | null>(null);
  
  const fetchTodos = useCallback(async () => {
    const res = await fetch(`http://localhost:3000/todos/${id}`);
    const todo = await res.json();
    setTodo(todo);
  }, []);
  useEffect(() => { 
    fetchTodos();
  }, [id]);
  
  return (
    <div>
      {todo?.title}
      {todo?.content}
      <Link href={`/todos/${id}/edit`}>編集</Link>
    </div>
  );
}