"use client";
import Link from "next/link";
import { useFetchUsers } from "@/app/lib/userAction";

export default function Page() { 
  const { users, setUsers } = useFetchUsers();

  const removeUser = (id: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  }

  const handleDeleteUser = async (id: number) => {
    if (!confirm("本当に削除しますか？")) {
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      removeUser(id);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <div>
      <h1>Users一覧</h1>
      {users.map((user) => {
        return (
          <div key={user.id}
          className="flex justify-between items-center bg-red-100 m-1">
            <h2 className="text-xs">{user.name}</h2>
            <p className="text-xs">{user.tel}</p>
            <div className="grid grid-cols-3 gap-2">
              <Link 
                href={`/users/${user.id}/edit`}
                className="bg-green-500 text-white p-1 rounded hover:bg-green-700">
                編集
                </Link>
              <Link
                href={`/users/${user.id}`}
                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-700"
              >
                詳細
              </Link>
              <button
                className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                onClick={() => { handleDeleteUser(user.id)}}
              >削除
              </button>
            </div>
          </div>
        );
      }
      )}
      <Link href="/users/create">新規作成</Link>
    </div>
  );
}