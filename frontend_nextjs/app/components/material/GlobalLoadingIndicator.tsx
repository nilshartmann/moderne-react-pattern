import LoadingIndicator from "../LoadingIndicator.tsx";
import logo from "./logo.png";

export function GlobalLoadingIndicator() {
  return (
    <div className={"mt-8 h-full"}>
      <LoadingIndicator placeholder={<img src={logo.src} />}>
        Stay tuned
      </LoadingIndicator>
    </div>
  );
}
