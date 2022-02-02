import type { TCrosswordTable } from "../utils/table";

export type TCrosswordStore = {
  table: TCrosswordTable,
  openWords: Array<string>
}