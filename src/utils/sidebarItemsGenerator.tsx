import { NavLink } from "react-router-dom";
import { ReactNode } from "react";

export type TSideBarItem = {
  key: string;
  label: ReactNode;
  children?: TSideBarItem[];
};

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TUserFromRedux = {
  email: string;
  exp: number;
  iat: number;
  role: string;
};

export const sidebarItemsGenerator = (
  items: TUserPath[],
  role: string
): TSideBarItem[] => {
  const sidebarItems: TSideBarItem[] = items.reduce<TSideBarItem[]>(
    (acc, item) => {
      if (item.path && item.name) {
        acc.push({
          key: item.name,
          label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        });
      }
      if (item.children && item.children.length > 0) {
        const childItems: TSideBarItem[] = item.children
          .filter((child) => child.name) // Ensure name exists
          .map((child) => ({
            key: child.name!,
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
          }));

        acc.push({
          key: item.name,
          label: item.name,
          children: childItems.length > 0 ? childItems : undefined,
        });
      }
      return acc;
    },
    []
  );

  return sidebarItems;
};
