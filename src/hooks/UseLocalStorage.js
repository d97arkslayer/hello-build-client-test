import { useState, useEffect } from 'react';
import { useGitCloneState } from '../contexts/GitCloneStateContext';

const useLocalStorage = (key, initialValue) => {
  const { prefix } = useGitCloneState();
  const prefixKey = `${prefix}${key}`;
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(prefixKey);
    if (stored) {
      return JSON.parse(stored);
    }
    if (typeof initialValue === 'function') {
      return initialValue();
    }
    return initialValue;
  });

  useEffect(() => {
    if (value) {
      localStorage.setItem(prefixKey, JSON.stringify(value));
    }
  }, [prefixKey, value]);
  return [value, setValue];
};

export default useLocalStorage;
