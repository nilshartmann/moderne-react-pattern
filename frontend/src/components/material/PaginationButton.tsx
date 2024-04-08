import { PageButton } from "../Button.tsx";
import { PageLabel } from "../PaginationBar.tsx";

type PaginationButtonProps = {
  btn: PageLabel;
};
export default function PaginationButton({ btn }: PaginationButtonProps) {
  /* TODO:
   *  - Add Link  to /recipes around PageButton
   *  - Add Search Param 'page' from 'btn.page'
   *    - make sure, existing search params doesn't get lost (order by)
   *
   */
  return <PageButton state={btn} />;
}
