import React, { ReactNode } from "react";
import { DUNKIN } from "../pages/LoginPage";
import { useNavigate } from "react-router-dom";
import useComponentStore from "../store/useComponentStore";

interface SidebarProps {
  children?: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const redirect = useNavigate();
  const sideBarItems: string[] = ["Donuts", "Combos", "Users"];
  const { setSelectedComponent } = useComponentStore();

  const handleLogout = () => {
    localStorage.removeItem(DUNKIN);
    redirect("/login");
    window.location.reload();
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
