import { ReactNode } from "react";
import { Button, CheckLabel } from "../Button.tsx";
import { Link } from "@tanstack/react-router";

type CheckButtonProps = {
  checked: boolean;
  children: ReactNode;
  orderBy?: "time" | "rating" | undefined;
};

export function CheckButton({ checked, children, orderBy }: CheckButtonProps) {
  return (
    <Button checked={checked}>
      <Link
        to={"/recipes"}
        search={(s) => ({ ...s, orderBy: orderBy })}
        disabled={checked}
      >
        <CheckLabel checked={checked}>{children}</CheckLabel>
      </Link>
    </Button>
  );
}
