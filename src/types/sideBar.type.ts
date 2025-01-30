import { ReactNode } from "preact/compat";

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
