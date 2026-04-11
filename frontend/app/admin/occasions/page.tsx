"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useOccasions, Occasion } from "@/hooks/useOccasions";
import ImageUploader from "@/components/admin/ImageUploader";

export default function OccasionsAdminPage() {
  const { occasions, loading, error, createOccasion, updateOccasion, deleteOccasion } = useOccasions();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ imageUrl: string; publicId: string } | null>(null);

  const resetForm = () => {
    setEditingId(null); setIsCreating(false); setTitle("");
    setCurrentImage(null); setUploadedImage(null);
  };

  const handleEdit = (occ: Occasion) => {
    setEditingId(occ.id); setIsCreating(false);
    setTitle(occ.title); setCurrentImage(occ.imageUrl); setUploadedImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    let finalImageUrl = currentImage || "";
    let finalPublicId = "";
    if (uploadedImage) {
      if (uploadedImage.imageUrl === "") { finalImageUrl = ""; finalPublicId = ""; }
      else { finalImageUrl = uploadedImage.imageUrl; finalPublicId = uploadedImage.publicId; }
    }
    const payload = { title, imageUrl: finalImageUrl, ...(finalPublicId && { cloudinaryPublicId: finalPublicId }) };
    try {
      if (isCreating) await createOccasion(payload);
      else if (editingId !== null) await updateOccasion(editingId, payload);
      toast.success("Saved successfully");
      resetForm();
    } catch { toast.error("Something went wrong"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this occasion?")) {
      setSaving(true);
      try { await deleteOccasion(id); toast.success("Deleted"); }
      catch { toast.error("Something went wrong"); }
      finally { setSaving(false); }
    }
  };

  if (loading && occasions.length === 0) return <div className="text-[#3E2F26]/40 text-sm">Loading...</div>;
  if (error) return <div className="text-red-500 text-sm">{error}</div>;

  const isFormOpen = isCreating || editingId !== null;

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#3E2F26]">Celebrations</h1>
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
          <h2 className="text-sm font-semibold text-[#3E2F26]">{isCreating ? "Create Occasion" : "Edit Occasion"}</h2>
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors" />
          </div>
          <ImageUploader onUploadSuccess={setUploadedImage} defaultImage={currentImage || undefined} />
          <div className="flex justify-end gap-3 pt-2 border-t border-[#3E2F26]/8">
            <button type="button" onClick={resetForm} className="text-xs text-[#3E2F26]/40 hover:text-[#3E2F26] transition-colors">Cancel</button>
            <button type="submit" disabled={saving || !title}
              className="px-4 py-2 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold tracking-wide rounded transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Save Occasion"}
            </button>
          </div>
        </form>
      )}

      {!isFormOpen && (
        <div className="bg-white border border-[#3E2F26]/8 rounded-lg overflow-hidden shadow-sm">
          {occasions.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-[#3E2F26]/40 mb-4">No occasions found</p>
              <button onClick={() => { resetForm(); setIsCreating(true); }}
                className="text-xs text-[#C8773A] font-semibold hover:opacity-70 transition-opacity">
                + Add new occasion
              </button>
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
                {occasions.map((occ) => (
                  <tr key={occ.id} className="hover:bg-[#FAF3E8]/50 transition-colors">
                    <td className="px-6 py-4">
                      {occ.imageUrl ? (
                        <div className="relative w-12 h-12 rounded overflow-hidden">
                          <Image src={occ.imageUrl} alt={occ.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded flex items-center justify-center text-[9px] text-[#3E2F26]/30 uppercase tracking-wide">None</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#3E2F26]">{occ.title}</td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <button onClick={() => handleEdit(occ)} disabled={saving} className="text-[11px] text-[#C8773A] hover:opacity-70 font-semibold tracking-wide transition-opacity disabled:opacity-30">Edit</button>
                      <button onClick={() => handleDelete(occ.id)} disabled={saving} className="text-[11px] text-red-400 hover:opacity-70 font-semibold tracking-wide transition-opacity disabled:opacity-30">Delete</button>
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
