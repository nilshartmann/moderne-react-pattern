import { twMerge } from "tailwind-merge";
import { useServingsStore } from "../../-components/useServingsStore.ts";

type ServingsWidgetProps = {
  style?: "compact" | "large";
};

export default function ServingsWidget({
  style = "compact",
}: ServingsWidgetProps) {
  const servingsStore = useServingsStore();
  return (
    <div
      className={twMerge(
        "p-2 text-lg",
        style === "large"
          ? "flex h-full items-center space-x-2 rounded bg-white"
          : "space-x-1 rounded-lg border border-dotted border-gray-500",
      )}
    >
      {style === "large" && (
        <span className={"text-gray-500 "}>Show ingredients for</span>
      )}

      <i
        className={
          "fa-solid fa-circle-plus text-orange_2 hover:cursor-pointer hover:text-orange_2-500"
        }
        onClick={() => servingsStore.increaseServings()}
      />
      <span className={"text-gray-500 "}>
        {" "}
        {servingsStore.servings} servings{" "}
      </span>
      <i
        className={twMerge(
          "fa-solid fa-circle-minus cursor-pointer text-orange_2 hover:text-orange_2-500",
          servingsStore.servings < 2 &&
            "cursor-default text-gray-300 hover:text-gray-300",
        )}
        onClick={() => servingsStore.decreaseServings()}
      />
    </div>
  );
}
