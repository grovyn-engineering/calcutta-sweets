"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useWeddingStats, WeddingStat } from "@/hooks/useAdminData";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

export default function WeddingStatsAdminPage() {
  const { data, loading, createItem, updateItem, deleteItem } = useWeddingStats();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  const resetForm = () => { setEditingId(null); setIsCreating(false); setLabel(""); setValue(""); };
  const handleEdit = (item: WeddingStat) => { setEditingId(item.id); setLabel(item.label); setValue(item.value); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      if (isCreating) await createItem({ label, value }); else if (editingId !== null) await updateItem(editingId, { label, value });
      toast.success("Saved successfully"); resetForm();
    } catch { toast.error("Something went wrong"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this stat?")) {
      setSaving(true);
      try { await deleteItem(id); toast.success("Deleted"); } catch { toast.error("Something went wrong"); } finally { setSaving(false); }
    }
  };

  if (loading && (!data || data.length === 0)) return <AdminLoadingState message="Loading wedding stats…" />;
  const isFormOpen = isCreating || editingId !== null;

  return (
    <div className="w-full min-w-0">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          isFormOpen
            ? { label: "Wedding stats", onNavigate: resetForm }
            : { label: "Wedding stats", href: "/admin/wedding-stats" },
          ...(isFormOpen
            ? [{ label: isCreating ? "Create stat" : "Edit stat" }]
            : []),
        ]}
      />
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#3E2F26]">Wedding Stats</h1>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">Label</label>
              <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} required placeholder="Weddings Completed"
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">Value</label>
              <input type="text" value={value} onChange={(e) => setValue(e.target.value)} required placeholder="500+"
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={resetForm} className="text-xs text-[#3E2F26]/40 hover:text-[#3E2F26] transition-colors">Cancel</button>
            <button type="submit" disabled={saving}
              className="px-4 py-2 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold rounded transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Save Stat"}
            </button>
          </div>
        </form>
      )}

      {!isFormOpen && (
        <div className="bg-white border border-[#3E2F26]/8 rounded-lg overflow-hidden shadow-sm">
          {data?.length === 0 ? (
            <div className="p-4 sm:p-6">
              <AdminEmptyState
                icon={Heart}
                title="No wedding stats yet"
                description="Add numbers and labels for the wedding experience section on your site."
              >
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsCreating(true);
                  }}
                  className="rounded-lg bg-[#C8773A] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#b5692e]"
                >
                  + Add stat
                </button>
              </AdminEmptyState>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#3E2F26]/8">
                  <th className="px-6 py-3.5 text-[10px] font-semibold text-[#3E2F26]/40 tracking-widest uppercase">Label</th>
                  <th className="px-6 py-3.5 text-[10px] font-semibold text-[#3E2F26]/40 tracking-widest uppercase">Value</th>
                  <th className="px-6 py-3.5 text-[10px] font-semibold text-[#3E2F26]/40 tracking-widest uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3E2F26]/5">
                {data?.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAF3E8]/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-[#3E2F26]">{item.label}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#C8773A]">{item.value}</td>
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
