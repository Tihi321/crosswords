import { useLocalStorage } from "./useLocalStorage";
import { useSettings } from "./useSettings";

export const useLocalSettings = () => {
  const { getLocalRows, getLocalColumns, getLocalWordLimit, getLocalSkipVertical, getLocalSkipHorizontal } = useLocalStorage();
  const { setState} = useSettings();

  const setLocalSettings = () => {
    setState({
      numberOfRows: getLocalRows(),
      numberOfColumns: getLocalColumns(),
      wordLimit: getLocalWordLimit(),
      skipHorizontal: getLocalSkipHorizontal(),
      skipVertical: getLocalSkipVertical(),
    });
  }

  return {
    setLocalSettings
  }
}