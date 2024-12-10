"use client";

import React, { useContext, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { AppContext } from "./AppProvider";
import { FRONTEND } from "@/utils/logging";

export interface Props {
  successCallback: (user: any) => void;
}

const ZipUploader: React.FC<Props> = ({successCallback}) => {
  const [file, setFile] = useState<File | null>(null);
  const { setLoading, setLoadingLabel } = useContext(AppContext);
  const [status, setStatus] = useState<{
    type: "error" | "success";
    message: string;
  }>({ type: "success", message: "" });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setLoadingLabel("Uploading...");
      setStatus({ type: "success", message: "" });
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      setLoading(false);

      const data = await response.json();
      if (response.ok) {
        successCallback(data.data.user);
        setStatus({ type: "success", message: "File uploaded successfully" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "An error occurred while uploading the file",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred while uploading the file",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div
        className="p-5 border border-dashed flex items-center justify-center rounded"
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <ArrowUpTrayIcon className="w-12 h-12" />
          <span className="font-thin text-gray-300 tracking-wide italic">
            {file
              ? "Uploaded: " + file.name
              : "Drag and drop a file here or click to upload"}
          </span>
        </label>
      </div>
      <h6
        className={`text-lg text-center ${
          status.type === "error"
            ? "text-red-500"
            : status.type === "success"
            ? "text-green-500"
            : ""
        }`}
      >
        {status.message}
      </h6>
      <button
        type="submit"
        className="uppercase mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </form>
  );
};

export default ZipUploader;
