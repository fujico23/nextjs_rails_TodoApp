"use client";
import { useCallback, useEffect, useState } from 'react';
import { Todo } from "@/interfaces/index";
import { usePathname } from 'next/navigation';

// Todo一覧を取得するカスタムフック
export const useFetchTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/todos');
      if (!response.ok) { 
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const todos = await response.json();
      setTodos(todos);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error : new Error(String(error)));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  
  return { todos, fetchTodos, loading, error };
}

// Todo詳細を取得するカスタムフック
export const useFetchTodo = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const currentPath = usePathname();
  const id = currentPath.split("/")[2];
  
  const fetchTodo = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const json = await res.json();
      setTodo(json);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error : new Error(String(error)));
    }
    setLoading(false);
  }, []);
  
  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  return { todo, fetchTodo, loading, error, id };
}