"use client";
import React, { useState } from "react";
import Loading from "./Loading";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const ZipUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

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
      setUploading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      setUploading(false);
      const data = await response.json();
      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert(`File upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed");
    }
  };

  return (
    <>
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
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <ArrowUpTrayIcon className="w-12 h-12" />
            <span className="font-thin text-gray-300 tracking-wide italic">{file ? "Uploaded: " + file.name : "Drag and drop a file here or click to upload"}</span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
      <Loading label="Uploading..." enabled={uploading} />
    </>
  );
};

export default ZipUploader;
