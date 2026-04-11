"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/apiHelper";
import ImageUploader from "@/components/admin/ImageUploader";
import { useHero } from "@/hooks/useHero";
import toast from "react-hot-toast";

export default function HeroAdminPage() {
  const { hero, loading, updateHero } = useHero();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ imageUrl: string; publicId: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (hero) {
      setTitle(hero.title || "");
      setSubtitle(hero.subtitle || "");
      setCurrentImage(hero.imageUrl || null);
    }
  }, [hero]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload: any = { title, subtitle };

    if (uploadedImage) {
      if (uploadedImage.imageUrl === "") {
        payload.imageUrl = "";
        payload.cloudinaryPublicId = "";
      } else {
        payload.imageUrl = uploadedImage.imageUrl;
        payload.cloudinaryPublicId = uploadedImage.publicId;
      }
    }

    try {
      await updateHero(payload);
      toast.success("Saved successfully");
      setUploadedImage(null);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-[#3E2F26]/40 text-sm">Loading...</div>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-[#3E2F26] mb-1">Homepage Banner</h1>
      <p className="text-sm text-[#3E2F26]/50 italic mb-8">"Update the main header section of your website."</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-[#3E2F26]/8 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-4 h-4 text-[#C8773A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            <h2 className="text-sm font-semibold text-[#3E2F26] tracking-wide">Banner Details</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">
                Main Headline
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors"
                placeholder="A Symphony of Heritage & Artisanal Sweetness"
                required
              />
              <p className="text-[10px] text-[#3E2F26]/30 mt-1.5 italic">Recommended: Around 8 words for the best look.</p>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors resize-none"
                placeholder="Preserving the soul of Calcutta's confectionery since 1874..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#3E2F26]/8 rounded-lg p-6 shadow-sm">
          <ImageUploader
            onUploadSuccess={setUploadedImage}
            defaultImage={currentImage || undefined}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold tracking-widest uppercase rounded transition-colors disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
