import { useState, useEffect } from 'react';

// ==============================|| HOOKS - LOCAL STORAGE ||============================== //

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue === null ? defaultValue : JSON.parse(storedValue);
    }
    return defaultValue;
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    const listener = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
      }
    };
    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue: T | ((val: T) => T)) => {
    setValue((currentValue) => {
      const result = typeof newValue === 'function' ? (newValue as (val: T) => T)(currentValue) : newValue;
      // Only set localStorage if we're in the browser environment
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(result));
      }
      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
