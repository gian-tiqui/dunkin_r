import { ReactNode } from "react";

export type User = {
  username: string;
  email: string;
};

export type RouteType = {
  path: string;
  name: string;
  element: ReactNode;
};

export type SidebarItemType = {
  label: string;
  component: ReactNode;
};

export type ComponentType = {
  [key: string]: ReactNode;
};
