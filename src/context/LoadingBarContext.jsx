import { createContext, useContext, useRef } from "react";

const LoadingBarContext = createContext(null);

export function LoadingBarProvider({ children, loadingRef }) {
  return (
    <LoadingBarContext.Provider value={loadingRef}>
      {children}
    </LoadingBarContext.Provider>
  );
}

export function useLoadingBar() {
  const ref = useContext(LoadingBarContext);
  return {
    start: () => ref?.current?.start(),
    finish: () => ref?.current?.finish(),
    reset: () => ref?.current?.reset(),
  };
}
