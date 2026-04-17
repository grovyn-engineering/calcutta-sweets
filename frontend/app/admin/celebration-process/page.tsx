"use client";

import { useState } from "react";
import { ListOrdered } from "lucide-react";
import toast from "react-hot-toast";
import { useCelebrationProcessSteps, CelebrationProcessStep } from "@/hooks/useAdminData";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

const ICON_KEYS = ["ClipboardEdit", "Palette", "CookingPot", "Truck", "Sparkles", "Gift", "Heart"] as const;

export default function CelebrationProcessAdminPage() {
  const { data, loading, createItem, updateItem, deleteItem } = useCelebrationProcessSteps();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stepNumber, setStepNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconKey, setIconKey] = useState<string>("ClipboardEdit");
  const [sortOrder, setSortOrder] = useState(0);

  const resetForm = () => {
    setEditingId(null);
    setIsCreating(false);
    setStepNumber("");
    setTitle("");
    setDescription("");
    setIconKey("ClipboardEdit");
    setSortOrder(0);
  };

  const handleEdit = (item: CelebrationProcessStep) => {
    setEditingId(item.id);
    setStepNumber(item.stepNumber);
    setTitle(item.title);
    setDescription(item.description);
    setIconKey(item.iconKey);
    setSortOrder(item.sortOrder);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isCreating) await createItem({ stepNumber, title, description, iconKey, sortOrder });
      else if (editingId) await updateItem(editingId, { stepNumber, title, description, iconKey, sortOrder });
      toast.success("Saved successfully");
      resetForm();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this step?")) return;
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
    return <AdminLoadingState message="Loading celebration steps…" />;
  }

  const isFormOpen = isCreating || editingId !== null;

  return (
    <div className="w-full min-w-0">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          isFormOpen
            ? { label: "Celebration steps", onNavigate: resetForm }
            : { label: "Celebration steps", href: "/admin/celebration-process" },
          ...(isFormOpen
            ? [{ label: isCreating ? "Create step" : "Edit step" }]
            : []),
        ]}
      />
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Celebration process</h1>
          <p className="mt-1 text-sm text-neutral-500">Four-step cards on the celebrations page (icons use Lucide names).</p>
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
                Step number
              </label>
              <input
                value={stepNumber}
                onChange={(e) => setStepNumber(e.target.value)}
                required
                placeholder="01"
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Icon
              </label>
              <select
                value={iconKey}
                onChange={(e) => setIconKey(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              >
                {ICON_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
            />
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
                icon={ListOrdered}
                title="No celebration steps"
                description="The four-step process cards on the celebrations page live here. Run db:migrate-static in the backend or create steps manually."
              >
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsCreating(true);
                  }}
                  className="rounded-lg bg-[#C8773A] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#b5692e]"
                >
                  + Add step
                </button>
              </AdminEmptyState>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">#</th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Title</th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Icon</th>
                  <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/80">
                    <td className="px-5 py-3 font-mono text-neutral-500">{item.stepNumber}</td>
                    <td className="px-5 py-3 font-medium text-neutral-900">{item.title}</td>
                    <td className="px-5 py-3 text-neutral-600">{item.iconKey}</td>
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
