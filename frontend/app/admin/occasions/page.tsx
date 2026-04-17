"use client";

import { useState } from "react";
import Image from "next/image";
import { PartyPopper } from "lucide-react";
import toast from "react-hot-toast";
import { useOccasions, Occasion } from "@/hooks/useOccasions";
import ImageUploader from "@/components/admin/ImageUploader";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

const ICON_KEYS = ["Heart", "Cake", "Landmark", "Flame", "Briefcase"] as const;

export default function OccasionsAdminPage() {
  const { occasions, loading, error, createOccasion, updateOccasion, deleteOccasion } = useOccasions();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [iconKey, setIconKey] = useState<string>("Heart");
  const [sortOrder, setSortOrder] = useState("0");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ imageUrl: string; publicId: string } | null>(null);

  const resetForm = () => {
    setEditingId(null); setIsCreating(false); setTitle("");
    setIconKey("Heart"); setSortOrder("0");
    setCurrentImage(null); setUploadedImage(null);
  };

  const handleEdit = (occ: Occasion) => {
    setEditingId(occ.id); setIsCreating(false);
    setTitle(occ.title); setCurrentImage(occ.imageUrl); setUploadedImage(null);
    setIconKey(occ.iconKey || "Heart");
    setSortOrder(String(occ.sortOrder ?? 0));
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
    const payload = {
      title,
      imageUrl: finalImageUrl,
      iconKey,
      sortOrder: Math.round(Number(sortOrder) || 0),
      ...(finalPublicId && { cloudinaryPublicId: finalPublicId }),
    };
    try {
      if (isCreating) await createOccasion(payload);
      else if (editingId !== null) await updateOccasion(editingId, payload);
      toast.success("Saved successfully");
      resetForm();
    } catch { toast.error("Something went wrong"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this occasion?")) {
      setSaving(true);
      try { await deleteOccasion(id); toast.success("Deleted"); }
      catch { toast.error("Something went wrong"); }
      finally { setSaving(false); }
    }
  };

  if (error) return <div className="w-full rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>;
  if (loading) return <AdminLoadingState message="Loading celebrations…" />;

  const isFormOpen = isCreating || editingId !== null;

  return (
    <div className="w-full min-w-0">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          isFormOpen
            ? { label: "Celebrations", onNavigate: resetForm }
            : { label: "Celebrations", href: "/admin/occasions" },
          ...(isFormOpen
            ? [{ label: isCreating ? "Create occasion" : "Edit occasion" }]
            : []),
        ]}
      />
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">Card icon</label>
              <select
                value={iconKey}
                onChange={(e) => setIconKey(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A]"
              >
                {ICON_KEYS.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">Sort order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A]"
              />
            </div>
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
            <div className="p-4 sm:p-6">
              <AdminEmptyState
                icon={PartyPopper}
                title="No celebrations yet"
                description="Add seasonal boxes and occasion imagery for the celebrations page. Each item appears in your public site grid."
              >
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsCreating(true);
                  }}
                  className="rounded-lg bg-[#C8773A] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#b5692e]"
                >
                  + Add celebration
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
