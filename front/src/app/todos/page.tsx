"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  content: string;
};

export default function Page() { 
  const [todos, setTodos] = useState<Todo[]>([]);
  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3000/todos');
    const todos: Todo[] = await response.json();
    setTodos(todos);
  }
  useEffect(() => { 
    fetchTodos();
  }, []);
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
    </div>
  );
}