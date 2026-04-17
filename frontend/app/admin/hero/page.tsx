"use client";

import { useState } from "react";
import { Images } from "lucide-react";
import toast from "react-hot-toast";
import { useHeroSlides, HeroData } from "@/hooks/useAdminData";
import ImageUploader from "@/components/admin/ImageUploader";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

export default function HeroAdminPage() {
  const { data: slides, loading, error, createItem, updateItem, deleteItem } = useHeroSlides();

  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [currentPublicId, setCurrentPublicId] = useState<string | null>(null);
  
  const [uploadedImage, setUploadedImage] = useState<{ imageUrl: string; publicId: string } | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSubtitle("");
    setCurrentImage(null);
    setCurrentPublicId(null);
    setUploadedImage(null);
  };

  const startEdit = (item: HeroData) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSubtitle(item.subtitle);
    setCurrentImage(item.imageUrl);
    setCurrentPublicId(item.publicId);
    setUploadedImage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subtitle.trim()) {
      toast.error("Please fill in text fields.");
      return;
    }

    setSaving(true);
    let finalImageUrl = currentImage || "";
    let finalPublicId = currentPublicId || "";

    if (uploadedImage) {
      finalImageUrl = uploadedImage.imageUrl;
      finalPublicId = uploadedImage.publicId;
    }

    const payload = { 
      title, 
      subtitle, 
      imageUrl: finalImageUrl, 
      cloudinaryPublicId: finalPublicId 
    };

    try {
      if (editingId) {
        await updateItem(editingId, payload);
        toast.success("Slide updated!");
      } else {
        await createItem(payload);
        toast.success("Slide created!");
      }
      resetForm();
    } catch (err: any) {
      toast.error("Failed to save slide.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this slide?")) return;
    setSaving(true);
    try {
      await deleteItem(id);
      toast.success("Slide deleted!");
    } catch {
      toast.error("Failed to delete slide.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoadingState message="Loading hero slides…" />;
  if (error) return <div className="w-full rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">Error loading slides: {error}</div>;

  return (
    <div className="w-full min-w-0">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Hero carousel", href: "/admin/hero" },
          { label: editingId ? "Edit slide" : "Add slide" },
        ]}
      />
      <h1 className="text-2xl font-semibold text-[#3E2F26] mb-1">Homepage Carousel Slides</h1>
      <p className="text-sm text-[#3E2F26]/50 italic mb-8">
        Manage the dynamic 4-image rotating background and text headers for the homepage overview.
      </p>

      <div className="bg-white border border-[#3E2F26]/10 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xs font-semibold text-[#3E2F26]/60 tracking-widest uppercase mb-4">
          Current Slides
        </h2>

        {!slides || slides.length === 0 ? (
          <AdminEmptyState
            icon={Images}
            title="No slides in the database yet"
            description="Add slides here so the homepage carousel uses your copy and images. Until then, the site may use placeholder content."
          />
        ) : (
          <div className="space-y-4">
            {slides.map((slide) => (
              <div key={slide.id} className="group flex items-center gap-4 rounded border border-[#3E2F26]/10 px-5 py-4 transition-colors hover:border-[#C8773A]/30">
                
                <div className="w-16 h-16 shrink-0 bg-gray-100 rounded overflow-hidden">
                  {slide.imageUrl ? (
                    <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Img</div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[#3E2F26]">{slide.title}</h3>
                  <p className="text-xs text-[#3E2F26]/60 line-clamp-1">{slide.subtitle}</p>
                </div>

                <div className="ml-2 flex shrink-0 gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => startEdit(slide)} className="text-[10px] uppercase font-bold text-[#C8773A] hover:underline" disabled={saving}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(slide.id)} className="text-[10px] uppercase font-bold text-red-500 hover:underline" disabled={saving}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <h2 className="text-xs font-semibold text-[#3E2F26]/60 tracking-widest uppercase mb-4 pl-1">
        {editingId ? "Edit Slide" : "Add New Slide"}
      </h2>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white border border-[#3E2F26]/8 rounded-lg p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">
              Main Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors disabled:opacity-50"
              placeholder="e.g. Sondesh"
              disabled={saving}
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">
              Description / Alt Text
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors disabled:opacity-50"
              placeholder="e.g. Delicious Chamcham sweets"
              disabled={saving}
              required
            />
          </div>
        </div>

        <div className="bg-white border border-[#3E2F26]/8 rounded-lg p-6 shadow-sm">
          <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-4">
            Slide Background Image
          </label>
          <ImageUploader
            onUploadSuccess={setUploadedImage}
            defaultImage={currentImage || undefined}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold tracking-widest uppercase rounded transition-colors disabled:opacity-50"
              disabled={saving}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold tracking-widest uppercase rounded transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : editingId ? "Update Slide" : "Create Slide"}
          </button>
        </div>
      </form>
    </div>
  );
}
