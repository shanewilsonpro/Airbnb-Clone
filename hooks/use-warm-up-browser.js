// Libraries
import { useEffect } from "react";
import { warmUpAsync, coolDownAsync } from "expo-web-browser";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    warmUpAsync();
    return () => {
      coolDownAsync();
    };
  }, []);
};
