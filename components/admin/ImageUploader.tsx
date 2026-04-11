"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { fetchWithAuth } from "@/lib/apiHelper";

interface ImageUploaderProps {
  onUploadSuccess: (data: { imageUrl: string; publicId: string }) => void;
  defaultImage?: string;
  className?: string;
}

export default function ImageUploader({ onUploadSuccess, defaultImage, className = "" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Only JPEG, PNG, or WEBP are allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Max file size is 2MB.");
        return;
      }

      setError(null);
      setUploading(true);

      try {
        const signRes = await fetchWithAuth("/upload/sign", { method: "POST" });
        const signData = await signRes.json();

        if (!signData.success) throw new Error("Failed to get upload signature");

        const { signature, timestamp, cloudName, apiKey, folder } = signData.data;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);
        formData.append("folder", folder);

        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) throw new Error(uploadData.error?.message || "Upload to Cloudinary failed");

        setPreview(uploadData.secure_url);
        onUploadSuccess({ imageUrl: uploadData.secure_url, publicId: uploadData.public_id });
      } catch (err: any) {
        setError(err.message || "An error occurred during upload.");
      } finally {
        setUploading(false);
      }
    },
    [onUploadSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onUploadSuccess({ imageUrl: "", publicId: "" });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {error && <p className="text-red-500 text-xs">{error}</p>}

      <div
        {...getRootProps()}
        className={`relative border border-dashed rounded flex flex-col items-center justify-center transition-colors cursor-pointer min-h-[200px] overflow-hidden ${isDragActive
          ? "border-[#C8773A] bg-[#C8773A]/5"
          : "border-[#3E2F26]/20 bg-[#FAF3E8] hover:border-[#C8773A]/50 hover:bg-[#C8773A]/5"
          }`}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="absolute inset-0 w-full h-full">
            <Image src={preview} alt="Upload Preview" fill className="object-cover opacity-70" />
            {uploading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                <Spinner />
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 hover:opacity-100 transition-opacity bg-[#3E2F26]/60">
                <p className="text-white text-xs font-semibold tracking-wide">Click or drag to replace</p>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="bg-white text-[#3E2F26] hover:bg-[#FAF3E8] px-4 py-1.5 rounded text-xs font-semibold transition-colors"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-8">
            {uploading ? (
              <Spinner />
            ) : (
              <>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-[#C8773A]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#C8773A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-[#3E2F26]/70 mb-1">
                  <span className="text-[#C8773A] font-semibold">Image Manager</span>
                </p>
                <p className="text-xs text-[#3E2F26]/40">Drag and drop your photos or click to browse.</p>
                <p className="text-xs text-[#3E2F26]/30 mt-1">Supports image formats like JPG, PNG, and WEBP.</p>
                <div className="flex gap-2 justify-center mt-4">
                  <span className="px-3 py-1 border border-[#3E2F26]/15 rounded text-[10px] text-[#3E2F26]/50 tracking-wide">Add New Image</span>
                  <span className="px-3 py-1 border border-[#3E2F26]/15 rounded text-[10px] text-[#3E2F26]/50 tracking-wide">Browse All</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div className="w-8 h-8 border-2 border-[#C8773A] border-t-transparent rounded-full animate-spin" />
  );
}
