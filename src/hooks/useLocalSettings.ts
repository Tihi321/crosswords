import { useLocalStorage } from "./useLocalStorage";
import { useSettings } from "./useSettings";

export const useLocalSettings = () => {
  const { getLocalRows, getLocalColumns, getLocalWordLimit, getLocalSkipVertical, getLocalSkipHorizontal } = useLocalStorage();
  const { setRows, setColumns, setWordLimit, setSkipHorizontal, setSkipVertical} = useSettings();

  const setLocalSettings = () => {
    const localRows = getLocalRows();
    const localColumns = getLocalColumns();
    const localWordLimit = getLocalWordLimit();
    const localSkipVertical = getLocalSkipVertical();
    const localSkipHorizontal = getLocalSkipHorizontal();

    if (localRows) {
      setRows(Number(localRows));
    }

    if (localColumns) {
      setColumns(Number(localColumns));
    }

    if (localWordLimit) {
      setWordLimit(Number(localWordLimit));
    }

    if (localSkipVertical) {
      setSkipVertical(Number(localSkipVertical));
    }

    if (localSkipHorizontal) {
      setSkipHorizontal(Number(localSkipHorizontal));
    }
  }

  return {
    setLocalSettings
  }
}