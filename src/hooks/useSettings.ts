import { settings } from "../store/settings";
import { useLocalStorage } from "./useLocalStorage";

export const useSettings = () => {
  const { setLocalEndpoint } = useLocalStorage();

  const setEndpoint = (newEndpoint: string) => {
    setLocalEndpoint(newEndpoint);
    settings.update((state) => ({
      ...state,
      endpoint: newEndpoint
    }));
  };

  return {
    setEndpoint,
    settings
  }
}