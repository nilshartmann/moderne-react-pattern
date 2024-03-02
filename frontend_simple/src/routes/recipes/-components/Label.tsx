import { ReactNode } from "react";

type LabelProps = {
  children: ReactNode;
};

export default function Label({ children }: LabelProps) {
  return <div className="flex justify-center text-gray-500">{children}</div>;
}
