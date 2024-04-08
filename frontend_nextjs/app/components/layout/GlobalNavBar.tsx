import Link from "next/link";

export default function GlobalNavBar() {
  return (
    <nav className={"space-x-3"}>
      <Link className={"hover:text-red hover:underline"} href={"/"}>
        Home
      </Link>
      <Link className={"hover:text-red hover:underline"} href={"/about"}>
        About
      </Link>

      {/*

      TODO: add link to /privacy

      */}
    </nav>
  );
}
