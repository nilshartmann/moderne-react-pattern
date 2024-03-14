import { Link } from "@tanstack/react-router";

export default function NavBar() {
  return (
    <nav className={"space-x-3"}>
      <Link
        className={"hover:text-red hover:underline"}
        to={"/"}
        activeProps={{
          className: "text-red underline",
        }}
      >
        Home
      </Link>
      <Link
        className={"hover:text-red hover:underline"}
        to={"/about"}
        activeProps={{
          className: "text-red underline",
        }}
      >
        About
      </Link>
      <Link
        className={"hover:text-red hover:underline"}
        to={"/privacy"}
        activeProps={{
          className: "text-red underline",
        }}
      >
        Privacy
      </Link>
    </nav>
  );
}
