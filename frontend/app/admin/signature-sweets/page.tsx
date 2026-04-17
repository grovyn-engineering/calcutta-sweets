"use client";

import { useState } from "react";
import Image from "next/image";
import { Candy } from "lucide-react";
import toast from "react-hot-toast";
import { useSignatureSweets, SignatureSweet } from "@/hooks/useAdminData";
import ImageUploader from "@/components/admin/ImageUploader";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

export default function SignatureSweetsAdminPage() {
  const { data, loading, error, createItem, updateItem, deleteItem } = useSignatureSweets();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ imageUrl: string; publicId: string } | null>(null);

  const resetForm = () => { setEditingId(null); setIsCreating(false); setTitle(""); setSubTitle(""); setCurrentImage(null); setUploadedImage(null); };
  const handleEdit = (item: SignatureSweet) => { setEditingId(item.id); setTitle(item.title); setSubTitle(item.subTitle); setCurrentImage(item.imageUrl); setUploadedImage(null); };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    let finalImageUrl = currentImage || ""; let finalPublicId = "";
    if (uploadedImage) { if (uploadedImage.imageUrl === "") { finalImageUrl = ""; finalPublicId = ""; } else { finalImageUrl = uploadedImage.imageUrl; finalPublicId = uploadedImage.publicId; } }
    const payload = { title, subTitle, imageUrl: finalImageUrl, ...(finalPublicId && { cloudinaryPublicId: finalPublicId }) };
    try {
      if (isCreating) await createItem(payload); else if (editingId !== null) await updateItem(editingId, payload);
      toast.success("Saved successfully"); resetForm();
    } catch { toast.error("Something went wrong"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this item?")) {
      setSaving(true);
      try { await deleteItem(id); toast.success("Deleted"); } catch { toast.error("Something went wrong"); } finally { setSaving(false); }
    }
  };

  if (error) {
    return (
      <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
        Could not load signature sweets: {error}
      </div>
    );
  }
  if (loading) return <AdminLoadingState message="Loading signature sweets…" />;
  const isFormOpen = isCreating || editingId !== null;

  return (
    <div className="w-full min-w-0">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          isFormOpen
            ? { label: "Signature sweets", onNavigate: resetForm }
            : { label: "Signature sweets", href: "/admin/signature-sweets" },
          ...(isFormOpen
            ? [{ label: isCreating ? "Create item" : "Edit item" }]
            : []),
        ]}
      />
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#3E2F26]">Signature Sweets</h1>
        </div>
        {!isFormOpen && (
          <button onClick={() => { resetForm(); setIsCreating(true); }}
            className="px-4 py-2 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold tracking-widest uppercase rounded transition-colors">
            + Add New
          </button>
        )}
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white border border-[#3E2F26]/8 rounded-lg p-6 shadow-sm mb-6 space-y-5">
          <h2 className="text-sm font-semibold text-[#3E2F26]">{isCreating ? "Create Sweet" : "Edit Sweet"}</h2>
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">Subtitle</label>
            <input type="text" value={subTitle} onChange={(e) => setSubTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors" />
          </div>
          <ImageUploader onUploadSuccess={setUploadedImage} defaultImage={currentImage || undefined} />
          <div className="flex justify-end gap-3 pt-2 border-t border-[#3E2F26]/8">
            <button type="button" onClick={resetForm} className="text-xs text-[#3E2F26]/40 hover:text-[#3E2F26] transition-colors">Cancel</button>
            <button type="submit" disabled={saving || !title}
              className="px-4 py-2 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold tracking-wide rounded transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}

      {!isFormOpen && (
        <div className="bg-white border border-[#3E2F26]/8 rounded-lg overflow-hidden shadow-sm">
          {data?.length === 0 ? (
            <div className="p-4 sm:p-6">
              <AdminEmptyState
                icon={Candy}
                title="No signature sweets yet"
                description="Showcase bestsellers on the homepage with titles, subtitles, and photos."
              >
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsCreating(true);
                  }}
                  className="rounded-lg bg-[#C8773A] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#b5692e]"
                >
                  + Add item
                </button>
              </AdminEmptyState>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#3E2F26]/8">
                  <th className="px-6 py-3.5 text-[10px] font-semibold text-[#3E2F26]/40 tracking-widest uppercase">Image</th>
                  <th className="px-6 py-3.5 text-[10px] font-semibold text-[#3E2F26]/40 tracking-widest uppercase">Title</th>
                  <th className="px-6 py-3.5 text-[10px] font-semibold text-[#3E2F26]/40 tracking-widest uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3E2F26]/5">
                {data?.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAF3E8]/50 transition-colors">
                    <td className="px-6 py-4">
                      {item.imageUrl ? <div className="relative w-12 h-12 rounded overflow-hidden"><Image src={item.imageUrl} alt={item.title} fill className="object-cover" /></div>
                        : <div className="w-12 h-12 bg-[#FAF3E8] rounded border border-[#3E2F26]/10" />}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#3E2F26]">{item.title}</p>
                      <p className="text-xs text-[#3E2F26]/40 mt-0.5">{item.subTitle}</p>
                    </td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <button onClick={() => handleEdit(item)} className="text-[11px] text-[#C8773A] font-semibold hover:opacity-70 transition-opacity">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-[11px] text-red-400 font-semibold hover:opacity-70 transition-opacity">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
