import PrivacyPageContent from "../components/material/PrivacyPageContent.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: () => (
    <div className={"container mx-auto"}>
      <PrivacyPageContent />
    </div>
  ),
});
