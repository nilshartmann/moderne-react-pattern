import ServingsWidget from "../$recipeId/-components/ServingsWidget.tsx";

export default function GlobalServingsWidget() {
  return (
    <div
      className={"container mx-auto me-4 flex h-14 items-center justify-end"}
    >
      <ServingsWidget style={"large"} />
    </div>
  );
}
