import AboutPageContent from "../components/material/AboutPageContent.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className={"container mx-auto"}>
      <AboutPageContent />
    </div>
  );
}
