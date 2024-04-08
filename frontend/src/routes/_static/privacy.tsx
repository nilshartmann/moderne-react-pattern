import { createFileRoute } from "@tanstack/react-router";
import PrivacyPageContent from "../../components/material/PrivacyPageContent.tsx";

export const Route = createFileRoute("/_static/privacy")({
  component: PrivacyPageContent,
});
