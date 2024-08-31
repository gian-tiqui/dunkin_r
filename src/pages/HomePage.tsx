import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DUNKIN } from "./LoginPage";
import Sidebar from "../component/Sidebar";
import Donuts from "../component/Donuts";
import Combos from "../component/Combos";
import Users from "../component/Users";
import useComponentStore from "../store/componentStore";
import { ComponentType } from "../types/types";

const HomePage = () => {
  const redirect = useNavigate();
  const { selectedComponent } = useComponentStore();
  const components: ComponentType = {
    Donuts: <Donuts />,
    Combos: <Combos />,
    Users: <Users />,
  };
  useEffect(() => {
    try {
      if (!localStorage.getItem(DUNKIN)) redirect("/login");
    } catch (error) {
      console.error(error);
    }
  }, [redirect]);

  return (
    <div>
      <Sidebar>{components[selectedComponent]}</Sidebar>
    </div>
  );
};

export default HomePage;
