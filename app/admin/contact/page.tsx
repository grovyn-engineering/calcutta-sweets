"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useContactInfo } from "@/hooks/useAdminData";

export default function ContactInfoAdminPage() {
  const { data, loading, updateItem } = useContactInfo();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ address: "", phone: "", email: "", description: "" });

  useEffect(() => {
    if (data) setForm({ address: data.address || "", phone: data.phone || "", email: data.email || "", description: data.description || "" });
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try { await updateItem(null, form); toast.success("Saved successfully"); }
    catch { toast.error("Something went wrong"); } finally { setSaving(false); }
  };

  if (loading) return <div className="text-[#3E2F26]/40 text-sm">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-[#3E2F26] mb-8">Visit Us Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-[#3E2F26]/8 rounded-lg p-6 shadow-sm space-y-5">
        {[
          { key: "address", label: "Address", type: "textarea" },
          { key: "phone", label: "Phone Number", type: "input" },
          { key: "email", label: "Email Address", type: "input" },
          { key: "description", label: "Description / Notes", type: "textarea" },
        ].map(({ key, label, type }) => (
          <div key={key}>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">{label}</label>
            {type === "textarea" ? (
              <textarea rows={3} value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors resize-none" />
            ) : (
              <input type="text" value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors" />
            )}
          </div>
        ))}
        <div className="pt-2 border-t border-[#3E2F26]/8 flex justify-end">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold tracking-widest uppercase rounded transition-colors disabled:opacity-50">
            {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </form>
    </div>
  );
}
