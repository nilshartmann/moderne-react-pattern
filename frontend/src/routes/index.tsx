import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "../components/material/LandingPage.tsx";

export const Route = createFileRoute("/")({
  component: LandingPage,
});
