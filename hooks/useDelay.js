import { useEffect } from "react";

const useDelay = (callback, delay) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(timer);
  }, [callback, delay]);
};

export default useDelay;
