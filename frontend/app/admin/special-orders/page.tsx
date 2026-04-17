"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSpecialOrders } from "@/hooks/useAdminData";
import ImageUploader from "@/components/admin/ImageUploader";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

export default function SpecialOrdersAdminPage() {
  const { data, loading, updateItem } = useSpecialOrders();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ imageUrl: string; publicId: string } | null>(null);

  useEffect(() => {
    if (data) { setTitle(data.title || ""); setDescription(data.description || ""); setCurrentImage(data.imageUrl || null); }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    let finalImageUrl = currentImage || ""; let finalPublicId = "";
    if (uploadedImage) { if (uploadedImage.imageUrl === "") { finalImageUrl = ""; finalPublicId = ""; } else { finalImageUrl = uploadedImage.imageUrl; finalPublicId = uploadedImage.publicId; } }
    const payload = { title, description, imageUrl: finalImageUrl, ...(finalPublicId && { cloudinaryPublicId: finalPublicId }) };
    try { await updateItem(null, payload); toast.success("Saved successfully"); setUploadedImage(null); }
    catch { toast.error("Something went wrong"); } finally { setSaving(false); }
  };

  if (loading) return <AdminLoadingState message="Loading special orders…" />;

  return (
    <div className="w-full min-w-0">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Special orders", href: "/admin/special-orders" },
          { label: "Banner & copy" },
        ]}
      />
      <h1 className="text-2xl font-semibold text-[#3E2F26] mb-1">Special Orders</h1>
      <p className="text-sm text-[#3E2F26]/50 italic mb-8">"Manage information for custom and bulk orders."</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white border border-[#3E2F26]/8 rounded-lg p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">Short Text</label>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors resize-none" />
          </div>
        </div>

        <div className="bg-white border border-[#3E2F26]/8 rounded-lg p-6 shadow-sm">
          <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-4">Picture Banner</label>
          <ImageUploader onUploadSuccess={setUploadedImage} defaultImage={currentImage || undefined} />
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving || !title}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold tracking-widest uppercase rounded transition-colors disabled:opacity-50">
            {saving ? "Saving..." : "Save Special Orders"}
          </button>
        </div>
      </form>
    </div>
  );
}
