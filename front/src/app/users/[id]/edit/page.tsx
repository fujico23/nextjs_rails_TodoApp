"use client";
import { useFetchUser, useFetchUserEdit } from "@/app/lib/userAction";
import { useEffect } from "react";

export default function Page() {
  const { user } = useFetchUser();
  const { name, tel, setName, setTel, handleUserEdit } = useFetchUserEdit();

  useEffect(() => {
    setName(user.name);
    setTel(user.tel.toString());
  }, [user, setName, setTel]);

  return (
    <div>
      <form onSubmit={handleUserEdit}>
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
        <button type="submit">送信</button>
      </form>
    </div>
  );
}
