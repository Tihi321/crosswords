import type { TDetail } from "src/utils";
import type { TCrosswordTable } from "../utils/table";

export type TCrosswordStore = {
  table: TCrosswordTable,
  details: TDetail[],
  openWords: Array<string>
}