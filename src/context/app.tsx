import React, { FC, useMemo } from "react";

interface AppContextProps {
  isMobile: boolean | null;
}
const AppContext = React.createContext<AppContextProps>({
  isMobile: false,
});

const AppProvider: FC<AppContextProps> = ({ children, isMobile }) => {
  const value = useMemo(() => ({ isMobile }), [isMobile]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
