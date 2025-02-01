"user client";
import { useFetchUser } from "@/app/lib/userAction";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useFetchUser();
  const [name, setName] = useState<string>("");
  const [tel, setTel] = useState<string>("");

  useEffect(() => {
    setName(user.name);
    setTel(user.tel.toString()); // tel を文字列として管理
  }, [user]);

  return (
    <div>
      <form>
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