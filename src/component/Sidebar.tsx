import React, { ReactNode } from "react";
import { DUNKIN } from "../pages/LoginPage";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useComponentStore from "../store/componentStore";
import axios from "axios";

interface SidebarProps {
  children?: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const redirect = useNavigate();
  const sideBarItems: string[] = ["Donuts", "Combos", "Users"];
  const { setSelectedComponent } = useComponentStore();

  const handleLogout = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/logout`,
        {
          data: { refreshToken: Cookies.get(DUNKIN) },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem(DUNKIN);
        Cookies.remove(DUNKIN);

        redirect("/login");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col justify-between w-1/4 bg-white shadow">
        <div>
          {sideBarItems.map((item: string, index: number) => (
            <p
              onClick={() => setSelectedComponent(item)}
              className="cursor-pointer"
              key={index}
            >
              {item}
            </p>
          ))}
        </div>
        <div>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
      <div className="w-3/4 overflow-auto">{children}</div>
    </div>
  );
};

export default Sidebar;
