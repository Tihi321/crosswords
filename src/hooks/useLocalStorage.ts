import { ELocalStorage, EThemes } from "../constants";

export const useLocalStorage = () => {
  const getItem = (key: string) => localStorage.getItem(key);
  const setItem = (key: string, value: string) => localStorage.setItem(key, value);

  const getLocalTheme = () => getItem(ELocalStorage.Theme);
  const setLocalTheme = (theme: EThemes) => setItem(ELocalStorage.Theme, theme);

  const getLocalEndpoint = () => getItem(ELocalStorage.Endpoint);
  const setLocalEndpoint = (endpoint: string) => setItem(ELocalStorage.Endpoint, endpoint);

  const getLocalRows = () => getItem(ELocalStorage.Rows);
  const setLocalRows = (rows: number) => setItem(ELocalStorage.Rows, rows as unknown as string);

  const getLocalColumns = () => getItem(ELocalStorage.Columns);
  const setLocalColumns = (columns: number) => setItem(ELocalStorage.Columns, columns as unknown as string);

  const getLocalWordLimit = () => getItem(ELocalStorage.WordLimit);
  const setLocalWordLimit = (limit: number) => setItem(ELocalStorage.WordLimit, limit as unknown as string);

  const getLocalSkipVertical = () => getItem(ELocalStorage.SkipVertical);
  const setLocalSkipVertical = (skip: number) => setItem(ELocalStorage.SkipVertical, skip as unknown as string);

  const getLocalSkipHorizontal = () => getItem(ELocalStorage.SkipHorizontal);
  const setLocalSkipHorizontal = (skip: number) => setItem(ELocalStorage.SkipHorizontal, skip as unknown as string);

  return {
    getLocalEndpoint,
    setLocalEndpoint,
    getLocalRows,
    setLocalRows,
    getLocalColumns,
    setLocalColumns,
    getLocalWordLimit,
    setLocalWordLimit,
    getLocalSkipVertical,
    setLocalSkipVertical,
    getLocalSkipHorizontal,
    setLocalSkipHorizontal,
    getLocalTheme,
    setLocalTheme
  }
}