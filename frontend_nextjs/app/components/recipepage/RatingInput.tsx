import { useState } from "react";
import { twMerge } from "tailwind-merge";

type RatingInputProps = {
  stars: number;
  onStarsChange: (action: (newStars: number) => number) => void;
  disabled?: boolean;
};

export default function RatingInput({
  stars,
  onStarsChange,
  disabled,
}: RatingInputProps) {
  const [hoverStarNo, setHoverStarNo] = useState(-1);

  const starClassName = (starNo: number) => {
    const isSelected = starNo <= stars;
    const isHovered = starNo <= hoverStarNo;
    const isAnyHovered = hoverStarNo >= 0;

    // 😱  😱  😱  😱  😱  😱  😱  😱  😱  😱  😱
    return twMerge(
      "fa-star m-0 cursor-pointer appearance-none bg-white pe-2 text-orange_2 focus:outline focus:outline-orange_2",
      starNo > 0 && "ps-2",
      isSelected || (starNo >= stars && isHovered && !disabled)
        ? "fa-solid"
        : "fa-regular",
      isAnyHovered && isSelected && starNo > hoverStarNo && "text-orange_2-200",
      !isAnyHovered && isSelected && "text-gray-500",
      !isAnyHovered && !isSelected && "text-gray-300",
      "disabled:cursor-default disabled:text-gray-300 disabled:hover:text-gray-300",
    );
  };

  const handleSelectStar = (starNo: number) =>
    onStarsChange((s) => (s === starNo ? -1 : starNo));

  const handleStarLeave = (starNo: number) =>
    setHoverStarNo((s) => (s === starNo ? -1 : s));

  return (
    <div className={"flex w-full items-center justify-between text-lg"}>
      <input
        type={"radio"}
        name={"stars"}
        value={1}
        disabled={disabled}
        onClick={() => handleSelectStar(0)}
        className={starClassName(0)}
        onFocus={() => setHoverStarNo(0)}
        onBlur={() => handleStarLeave(0)}
        onMouseEnter={() => setHoverStarNo(0)}
        onMouseLeave={() => handleStarLeave(0)}
      />
      <input
        type={"radio"}
        name={"stars"}
        value={2}
        onClick={() => handleSelectStar(1)}
        className={starClassName(1)}
        onFocus={() => setHoverStarNo(1)}
        onBlur={() => handleStarLeave(1)}
        onMouseEnter={() => setHoverStarNo(1)}
        onMouseLeave={() => handleStarLeave(1)}
      />
      <input
        type={"radio"}
        name={"stars"}
        value={3}
        onClick={() => handleSelectStar(2)}
        className={starClassName(2)}
        onFocus={() => setHoverStarNo(2)}
        onBlur={() => handleStarLeave(2)}
        onMouseEnter={() => setHoverStarNo(2)}
        onMouseLeave={() => handleStarLeave(2)}
      />
      <input
        type={"radio"}
        name={"stars"}
        value={4}
        onClick={() => handleSelectStar(3)}
        className={starClassName(3)}
        onFocus={() => setHoverStarNo(3)}
        onBlur={() => handleStarLeave(3)}
        onMouseEnter={() => setHoverStarNo(3)}
        onMouseLeave={() => handleStarLeave(3)}
      />
      <input
        type={"radio"}
        name={"stars"}
        value={5}
        onClick={() => handleSelectStar(4)}
        className={starClassName(4)}
        onFocus={() => setHoverStarNo(4)}
        onBlur={() => handleStarLeave(4)}
        onMouseEnter={() => setHoverStarNo(4)}
        onMouseLeave={() => handleStarLeave(4)}
      />
    </div>
  );
}
