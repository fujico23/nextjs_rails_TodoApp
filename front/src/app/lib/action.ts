"use client";

import { useCallback, useEffect, useState } from 'react';
import { Todo } from "@/interfaces/index";

export const useFetchTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/todos');
      const todos = await response.json();
      setTodos(todos);      
    } catch (error) {
      console.error('Error:', error);
     }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  return { todos, fetchTodos };
}