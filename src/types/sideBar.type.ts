import { ReactNode } from "react";

export type TSideBarItem =
  | {
      key: string;
      label: ReactNode;
      children?: TSideBarItem[];
    }
  | undefined;

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
