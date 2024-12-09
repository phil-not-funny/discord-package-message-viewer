"use client";

import React, { createContext, useState } from "react";

const AppContext = createContext<any>({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLabel, setLoadingLabel] = useState<string>("Uploading...");

  return (
    <AppContext.Provider
      value={{ loading, setLoading, loadingLabel, setLoadingLabel }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
