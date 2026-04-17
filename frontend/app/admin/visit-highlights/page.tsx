"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import toast from "react-hot-toast";
import { useVisitUsStats, VisitUsStat } from "@/hooks/useAdminData";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

export default function VisitHighlightsAdminPage() {
  const { data, loading, createItem, updateItem, deleteItem } = useVisitUsStats();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const resetForm = () => {
    setEditingId(null);
    setIsCreating(false);
    setLabel("");
    setValue("");
    setSortOrder(0);
  };

  const handleEdit = (item: VisitUsStat) => {
    setEditingId(item.id);
    setLabel(item.label);
    setValue(item.value);
    setSortOrder(item.sortOrder);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isCreating) await createItem({ label, value, sortOrder });
      else if (editingId) await updateItem(editingId, { label, value, sortOrder });
      toast.success("Saved successfully");
      resetForm();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this highlight?")) return;
    setSaving(true);
    try {
      await deleteItem(id);
      toast.success("Deleted");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading && (!data || data.length === 0)) {
    return <AdminLoadingState message="Loading visit highlights…" />;
  }

  const isFormOpen = isCreating || editingId !== null;

  return (
    <div className="w-full min-w-0">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          isFormOpen
            ? { label: "Visit strip", onNavigate: resetForm }
            : { label: "Visit strip", href: "/admin/visit-highlights" },
          ...(isFormOpen
            ? [{ label: isCreating ? "Create highlight" : "Edit highlight" }]
            : []),
        ]}
      />
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Visit page strip</h1>
          <p className="mt-1 text-sm text-neutral-500">The three highlights below the map on the Visit Us page.</p>
        </div>
        {!isFormOpen && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              setIsCreating(true);
            }}
            className="rounded-lg bg-[#C8773A] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#b5692e]"
          >
            + Add
          </button>
        )}
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Value (large text)
              </label>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Label (caption)
              </label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Sort order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full max-w-[120px] rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={resetForm} className="text-xs text-neutral-400 hover:text-neutral-700">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#C8773A] px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      )}

      {!isFormOpen && (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          {!data?.length ? (
            <div className="p-4 sm:p-6">
              <AdminEmptyState
                icon={BarChart3}
                title="No visit-strip highlights"
                description="These three lines appear under the map on the Visit Us page. Seed with npm run db:migrate-static in the backend or add rows here."
              >
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsCreating(true);
                  }}
                  className="rounded-lg bg-[#C8773A] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#b5692e]"
                >
                  + Add highlight
                </button>
              </AdminEmptyState>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Value</th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Label</th>
                  <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/80">
                    <td className="px-5 py-3 font-medium text-neutral-900">{item.value}</td>
                    <td className="px-5 py-3 text-neutral-600">{item.label}</td>
                    <td className="space-x-3 px-5 py-3 text-right">
                      <button type="button" onClick={() => handleEdit(item)} className="text-xs font-semibold text-[#C8773A]">
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(item.id)} className="text-xs font-semibold text-red-500">
                        Delete
                      </button>
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
