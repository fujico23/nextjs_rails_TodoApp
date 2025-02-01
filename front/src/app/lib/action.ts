"use client";
import { useCallback, useEffect, useState } from 'react';
import { Todo } from "@/interfaces/index";
import { usePathname, useRouter } from 'next/navigation';

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

  // const removeTodo = (id: number) => {
  //   setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  // };
  
  return { todos, setTodos, fetchTodos, loading, error};
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
  }, [id]);
  
  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  return { todo, fetchTodo, loading, error, id };
}

// Todoを作成するカスタムフック
export const useCreateTodo = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      setTitle('');
      setContent('');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error : new Error(String(error)));
    }
    setLoading(false);
  };

  return { title, setTitle, content, setContent, loading, error, handleSubmit };
}

// Todoを更新するページのデータを取得するカスタムフック
export const useFetchEditTodo = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const currentPath = usePathname();
  const id = currentPath.split("/")[2];

  const fetchEditTodo = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`);
      if (!res.ok) {
        throw new Error('エラーが発生しました');
      }
      const json = await res.json();
      setTitle(json.title);
      setContent(json.content);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error : new Error(String(error)));
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchEditTodo();
  }, [fetchEditTodo]);

  return { title, setTitle, content, setContent, loading, error };
}

// Todoを更新するカスタムフック
export const usePutTodo = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const currentPath = usePathname();
  const id = currentPath.split("/")[2];
  const router = useRouter();

  const handleEditForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      router.push(`/todos`);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error : new Error(String(error)));
    }
  }
  return { title, setTitle, content, setContent, loading, setLoading, error, setError,handleEditForm };
}

