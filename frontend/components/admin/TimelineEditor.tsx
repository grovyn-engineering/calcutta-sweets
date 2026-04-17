"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { History } from "lucide-react";
import { useTimelineEvents, TimelineEvent } from "@/hooks/useAdminData";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { FourDotsLoader } from "@/components/admin/FourDotsLoader";

export default function TimelineEditor() {
  const { data: events, loading, error, createItem, updateItem, deleteItem } = useTimelineEvents();

  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setEditingId(null);
    setYear("");
    setTitle("");
    setDescription("");
  };

  const startEdit = (item: TimelineEvent) => {
    setEditingId(item.id);
    setYear(item.year);
    setTitle(item.title);
    setDescription(item.description);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!year.trim() || !title.trim() || !description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSaving(true);
    const payload = { year, title, description };

    try {
      if (editingId) {
        await updateItem(editingId, payload);
        toast.success("Event updated successfully!");
      } else {
        await createItem(payload);
        toast.success("Event created successfully!");
      }
      resetForm();
    } catch (err: any) {
      toast.error("Failed to save event. " + (err.message || ""));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event? This cannot be undone.")) return;
    setSaving(true);
    try {
      await deleteItem(id);
      toast.success("Event deleted!");
    } catch (err: any) {
      toast.error("Failed to delete event.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-16 w-full border-t border-brand-brown/10 pt-12">
        <AdminLoadingState message="Loading timeline events…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16 w-full border-t border-brand-brown/10 pt-12">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
          Error loading events: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 mt-16 pt-12 border-t border-brand-brown/10">
      <h2 className="text-xl font-semibold text-brand-brown mb-1">Timeline Events</h2>
      <p className="text-sm text-brand-brown/50 italic mb-8">
        Manage the milestones for the "Our Journey Through Time" section on your Story page.
      </p>

      <div className="bg-white border border-brand-brown/10 rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-xs font-semibold text-brand-brown/60 tracking-widest uppercase mb-4">
          Current Events
        </h3>

        {(!events || events.length === 0) ? (
          <AdminEmptyState
            icon={History}
            title="No timeline events yet"
            description='Add milestones for the "Our Journey Through Time" section on the Story page. Use the form below to create your first event.'
          />
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex justify-between items-start border border-brand-brown/10 rounded p-4 group hover:border-[#C8773A]/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#C8773A] px-2 py-0.5 bg-[#FAF3E8] rounded shadow-sm">
                      {event.year}
                    </span>
                    <h4 className="text-sm font-semibold text-brand-brown">{event.title}</h4>
                  </div>
                  <p className="text-xs text-brand-brown/60">{event.description}</p>
                </div>

                <div className="flex gap-3 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(event)} className="text-[10px] uppercase font-bold text-[#C8773A] hover:underline" disabled={saving}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="text-[10px] uppercase font-bold text-red-500 hover:underline" disabled={saving}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <h3 className="text-xs font-semibold text-brand-brown/60 tracking-widest uppercase mb-4 pl-1">
        {editingId ? "Edit Event" : "Add New Event"}
      </h3>

      <form onSubmit={handleSave} className="bg-white border border-brand-brown/10 rounded-lg p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">
              Year / Period
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 1947 or Today"
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm focus:outline-none focus:border-[#C8773A] transition-colors disabled:opacity-50"
              disabled={saving}
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Humble Threshold"
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm focus:outline-none focus:border-[#C8773A] transition-colors disabled:opacity-50"
              disabled={saving}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm focus:outline-none focus:border-[#C8773A] transition-colors resize-none disabled:opacity-50"
            disabled={saving}
            required
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
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold tracking-widest uppercase rounded transition-colors disabled:opacity-50"
            disabled={saving}
          >
            {saving ? (
              <>
                <FourDotsLoader size="sm" aria-label="Saving" />
                Saving…
              </>
            ) : editingId ? (
              "Update Event"
            ) : (
              "Create Event"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
