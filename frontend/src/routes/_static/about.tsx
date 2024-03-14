import AboutPageContent from "../../components/material/AboutPageContent.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_static/about")({
  component: AboutPageContent,
});
