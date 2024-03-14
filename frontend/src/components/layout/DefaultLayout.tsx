import { ReactNode } from "react";
import Footer from "./Footer.tsx";
import { NewsletterRegistration } from "../material/NewsletterRegistration.tsx";
import NavBar from "./NavBar.tsx";

type DefaultLayoutProps = {
  children: ReactNode;
};

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={"flex min-h-screen flex-col"}>
      <div className={"container mx-auto h-16"}>
        <div className={"flex h-full items-center justify-between"}>
          <NavBar />
          <NewsletterRegistration />
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}
