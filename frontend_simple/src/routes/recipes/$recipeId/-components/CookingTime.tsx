import { formatMinuteDuration } from "../../../../components/formatters.ts";

type CookingTimeProps = {
  cookTime: number;
  preparationTime: number;
};

export function CookingTime({ cookTime, preparationTime }: CookingTimeProps) {
  return (
    <div
      className={"mt-3 w-full border-b border-dotted border-gray-300 pb-4 pt-4"}
    >
      <div className={"mb-4 flex items-center  justify-between "}>
        <h2 className={"font-space text-3xl font-bold"}>Cooking time</h2>
        <div className={"flex items-center"}>
          <i className="fa-regular fa-clock-four me-4 text-3xl text-orange_2 "></i>
          <div className={"font-inter text-gray-500 "}>
            <div className={"font-medium"}>Cooking</div>
            <div>{formatMinuteDuration(cookTime)}</div>
          </div>
        </div>
        <div className={"flex items-center"}>
          <i className="fa-regular fa-clock-four me-4 text-3xl text-orange_2 "></i>
          <div className={"font-inter text-gray-500 "}>
            <div className={"font-medium"}>Preperation</div>
            <div>{formatMinuteDuration(preparationTime)}</div>
          </div>
        </div>
        <div className={"flex items-center"}>
          <i className="fa-regular fa-clock-four me-4 text-3xl text-orange_2 "></i>
          <div className={"font-inter text-gray-500 "}>
            <div className={"font-medium"}>Total</div>
            <div>{formatMinuteDuration(cookTime + preparationTime)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
