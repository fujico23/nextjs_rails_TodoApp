"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/interfaces/index";

// ユーザー一覧を取得するカスタムフック
export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3000/users');
      if (!res.ok) { 
        throw new Error('エラーが発生しました');
      }
      const json = await res.json();
      setUsers(json);
    } catch (error) { 
      console.error(error);
    }
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  return { users, setUsers,fetchUsers };
}

// ユーザー詳細を取得するカスタムフック
export const useFetchUser = () => {
  const [user, setUser] = useState<User>({ id: 0, name: "", tel: 0 });
  const path = usePathname();
  const id = path.split("/")[2];
  
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`);
      if (!res.ok) {
        throw new Error('エラーが発生しました');
      }
      const json = await res.json();
      setUser(json);
    } catch (error) {
      console.error(error);
    }
  }, [id]);
  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return { user, fetchUser };
}

// ユーザーを更新するカスタムフック
export const useFetchUserEdit = () => {
  const { user } = useFetchUser();
  const [name, setName] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setName(user.name);
    setTel(user.tel.toString());
  }, [user]);

  const handleUserEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, tel }),
      })
      if (!res.ok) {
        throw new Error('エラーが発生しました');
      }
      router.push('/users');
    } catch (error) {
      console.error(error);
    }
  }
  return { name, tel, setName, setTel, handleUserEdit };
}