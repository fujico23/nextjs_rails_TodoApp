"use client";

import { useCallback, useEffect, useState } from 'react';
import { Todo } from "@/interfaces/index";

export const useFetchTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(async () => {
    const response = await fetch('http://localhost:3000/todos');
    const todos = await response.json();
    setTodos(todos);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  return { todos, fetchTodos };
}