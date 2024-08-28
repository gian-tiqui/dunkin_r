import { useEffect } from "react";
import useUserStore from "./store/userStore";
import { User } from "./types/types";

export default function App() {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const setU = () => {
      if (!user) {
        setTimeout(() => {
          const _user: User = {
            email: "gian@gmail.com",
            username: "gian_tiqui",
          };

          setUser(_user);
        }, 4000);
      }
    };

    setU();
  }, [user, setUser]);

  return (
    <div className="container grid h-screen bg-neutral-200 place-content-center">
      <p className="font-mono text-3xl font-bold text-center">Hello</p>
      {user && <p>{user.username}</p>}
    </div>
  );
}
