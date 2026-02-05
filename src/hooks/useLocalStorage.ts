"use client";

import { useSyncExternalStore, useCallback } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = () => {
    if (typeof window === "undefined") return JSON.stringify(initialValue);
    const item = window.localStorage.getItem(key);
    return item ?? JSON.stringify(initialValue);
  };

  const getServerSnapshot = () => {
    return JSON.stringify(initialValue);
  };

  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const value = JSON.parse(store) as T;

  const setValue = useCallback((newValue: T | ((val: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // Dispatch a local storage event so other tabs/hooks can update
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
