"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() { 
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUserCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, tel }),
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      router.push("/users");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
      console.error(error);
    } 
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={ handleUserCreate}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="tel">Tel</label>
        <input
          type="text"
          id="tel"
          name="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
        <button type="submit">作成</button>
      </form>
    </div>
  );
}