"use client";

import { BACKEND } from "@/utils/logging";
import { UploadStatus } from "@/utils/upload_statuses";
import React, { createContext, useState } from "react";

interface AppContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loadingLabel: string;
  setLoadingLabel: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps>({} as any);

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
