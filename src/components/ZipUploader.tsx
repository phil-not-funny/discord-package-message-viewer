"use client"
import React, { useState } from 'react';

const ZipUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('File uploaded successfully');
      } else {
        alert(`File upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="fileInput"
        type="file"
        accept=".zip"
        onChange={handleFileChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ZipUploader;