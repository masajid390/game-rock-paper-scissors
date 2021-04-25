import { useCallback } from "react";

export const useLocalStorage = () => {
  const getLocalStorage = useCallback((key: string): any => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setLocalStorage = useCallback((key: string, value: any) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getLocalStorage, setLocalStorage };
};
