"use client";
import { useFetchUser } from "@/app/lib/userAction";
import Link from "next/link";

export default function Page() {
  const { user } = useFetchUser();

  return (
    <div>
      <h1>{user.id}</h1>
      <p>{user.name}</p>
      <p>{user.tel}</p>
      <Link href="/users">戻る</Link>
    </div>
  );
}