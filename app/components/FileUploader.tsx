import React, { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProp{
    onFileSelect?:(file:File|null)=>void
}

const FileUploader = ({onFileSelect}:FileUploaderProp) => {
  const [file, setFile] = useState();
  const onDrop = useCallback((acceptedFiles:File[]) => {
    const fiel=acceptedFiles[0] || null

  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div className="gradient-border w-full">
      {" "}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          <div className="mx-auto w-16 h-16 fkx items-center justify-center">
            <img src="/icons/info.svg" alt="upload" className="size-20" />
          </div>
          {file ? (
            <div>
                
            </div>
          ) : (
            <div>
              <p className="text-lg text-gray-500 ">
                <span className="font-semibold">Click To Upload</span> or drag &
                drop
              </p>
              <p className="text-lg text-gray-500">PDF (max 20 MB)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
