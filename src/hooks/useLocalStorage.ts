import { useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T | null
): [T, Function] {
  // 存储的是用户信息
  let [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // The keys and the values stored with localStorage
      // are always in the UTF-16 string format, which uses two bytes per character.
      let value = JSON.parse(localStorage.getItem(key) || "null");
      if (value) {
        return value;
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  function setValue(newValue) {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (error) {
      console.log(error);
    }
  }

  return [storedValue, setValue];
}
