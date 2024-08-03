import { ReactNode } from "react";

export interface withLayout {
  children: (children: ReactNode) => void;
}
