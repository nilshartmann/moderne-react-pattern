import ButtonBar from "../ButtonBar.tsx";
import { NavButtonBar } from "../NavButtonBar.tsx";
import {
  FilterButton,
  OrderButton,
} from "@/app/components/recipelistpage/RecipeListButtons.tsx";

export default function RecipeListNavBar() {
  return (
    <NavButtonBar align={"left_right"}>
      <ButtonBar align={"start"}>
        <FilterButton />
      </ButtonBar>
      <ButtonBar>
        <OrderButton orderBy={undefined}>Newest first</OrderButton>
        <OrderButton orderBy={"rating"}>Best rated</OrderButton>
        <OrderButton orderBy={"time"}>Shortest time</OrderButton>
      </ButtonBar>
    </NavButtonBar>
  );
}
