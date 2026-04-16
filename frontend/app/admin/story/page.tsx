"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useStory } from "@/hooks/useAdminData";
import ImageUploader from "@/components/admin/ImageUploader";
import TimelineEditor from "@/components/admin/TimelineEditor";

export default function StoryAdminPage() {
  const { data, loading, error, updateItem } = useStory();

  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [currentPublicId, setCurrentPublicId] = useState<string | null>(null);

  const [uploadedImage, setUploadedImage] = useState<{
    imageUrl: string;
    publicId: string;
  } | null>(null);

  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setContent(data.content || "");
      setCurrentImage(data.imageUrl || null);
      setCurrentPublicId(data.publicId || null);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError("Headline is required.");
      return;
    }

    if (!content.trim()) {
      setFormError("Story content cannot be empty.");
      return;
    }

    setSaving(true);

    let finalImageUrl = currentImage || "";
    let finalPublicId = currentPublicId || "";

    // If new image uploaded → override
    if (uploadedImage) {
      finalImageUrl = uploadedImage.imageUrl;
      finalPublicId = uploadedImage.publicId;
    }

    const payload = {
      title: title.trim(),
      content: content.trim(),
      imageUrl: finalImageUrl,
      cloudinaryPublicId: finalPublicId,
      previousPublicId: currentPublicId || "", // for backend cleanup
    };

    try {
      await updateItem(data?.id || null, payload);

      toast.success("Story saved successfully ✨");

      setUploadedImage(null);
      setCurrentImage(finalImageUrl);
      setCurrentPublicId(finalPublicId);
    } catch (err: unknown) {
      console.error(err);

      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while saving.";

      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="text-brand-brown/50 text-sm animate-pulse">
        Loading story data...
      </div>
    );
  }

  // API Error
  if (error) {
    return (
      <div className="text-red-500 text-sm bg-red-50 border border-red-200 p-4 rounded">
        Failed to load story: {error}
      </div>
    );
  }

  // Empty State (IMPORTANT)
  if (!data) {
    return (
      <div className="text-sm text-brand-brown/60">
        No story data found. Please create one.
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-brand-brown mb-1">
        Our Story
      </h1>
      <p className="text-sm text-brand-brown/50 italic mb-8">
        "Tell the history and journey of your shop."
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && (
          <div className="text-red-600 text-xs bg-red-50 border border-red-200 px-3 py-2 rounded">
            {formError}
          </div>
        )}

        {/* TEXT */}
        <div className="bg-white border border-brand-brown/8 rounded-lg p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">
              Headline
            </label>
            <input
              type="text"
              value={title}
              disabled={saving}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm focus:outline-none focus:border-[#C8773A] transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">
              Story Text
            </label>
            <textarea
              rows={6}
              value={content}
              disabled={saving}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm focus:outline-none focus:border-[#C8773A] transition-colors resize-none disabled:opacity-50"
            />
          </div>
        </div>

        {/* IMAGE */}
        <div className="bg-white border border-brand-brown/8 rounded-lg p-6 shadow-sm">
          <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-4">
            Main Image
          </label>

          <ImageUploader
            onUploadSuccess={(data) => {
              setUploadedImage(data);
              toast.success("Image uploaded successfully 📸");
            }}
            defaultImage={currentImage || undefined}
          />

          {!currentImage && !uploadedImage && (
            <p className="text-xs text-brand-brown/40 mt-2">
              No image selected. Upload one to enhance your story.
            </p>
          )}
        </div>

        {/* ACTION */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold tracking-widest uppercase rounded transition-colors disabled:opacity-50"
          >
            {saving ? "Saving changes..." : "Save Story"}
          </button>
        </div>
      </form>

      {/* Embed the Timeline configurations directly below the Story settings */}
      <TimelineEditor />
    </div>
  );
}
