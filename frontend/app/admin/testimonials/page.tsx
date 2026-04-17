"use client";

import { useState } from "react";
import { MessageSquareQuote } from "lucide-react";
import toast from "react-hot-toast";
import { useTestimonials, Testimonial } from "@/hooks/useAdminData";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

export default function TestimonialsAdminPage() {
  const { data, loading, createItem, updateItem, deleteItem } = useTestimonials();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const resetForm = () => {
    setEditingId(null);
    setIsCreating(false);
    setQuote("");
    setName("");
    setTitle("");
    setSortOrder(0);
  };

  const handleEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setQuote(item.quote);
    setName(item.name);
    setTitle(item.title);
    setSortOrder(item.sortOrder);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isCreating) await createItem({ quote, name, title, sortOrder });
      else if (editingId) await updateItem(editingId, { quote, name, title, sortOrder });
      toast.success("Saved successfully");
      resetForm();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this testimonial?")) return;
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
    return <AdminLoadingState message="Loading testimonials…" />;
  }

  const isFormOpen = isCreating || editingId !== null;

  return (
    <div className="w-full min-w-0">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          isFormOpen
            ? { label: "Testimonials", onNavigate: resetForm }
            : { label: "Testimonials", href: "/admin/testimonials" },
          ...(isFormOpen
            ? [{ label: isCreating ? "Create testimonial" : "Edit testimonial" }]
            : []),
        ]}
      />
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Testimonials</h1>
          <p className="mt-1 text-sm text-neutral-500">Shown on the homepage in the testimonials section.</p>
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
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Quote
            </label>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              required
              rows={4}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#C8773A] focus:outline-none"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Attribution (e.g. role)
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                icon={MessageSquareQuote}
                title="No testimonials yet"
                description="Customer quotes power the homepage testimonials block. Run db:migrate-static in the backend to seed defaults, or add entries here."
              >
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsCreating(true);
                  }}
                  className="rounded-lg bg-[#C8773A] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#b5692e]"
                >
                  + Add testimonial
                </button>
              </AdminEmptyState>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Name</th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Quote</th>
                  <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/80">
                    <td className="px-5 py-3 font-medium text-neutral-900">{item.name}</td>
                    <td className="max-w-md truncate px-5 py-3 text-neutral-600">{item.quote}</td>
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
