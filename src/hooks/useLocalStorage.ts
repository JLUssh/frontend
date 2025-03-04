import { useState } from "react";
export default function useLocalStorage(key, defaultValue): [any, Function] {
  let [storedValue, setStoredValue] = useState(() => {
    try {
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
