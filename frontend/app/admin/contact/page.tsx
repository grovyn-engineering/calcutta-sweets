"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { LayoutGrid, Plus, Trash2 } from "lucide-react";
import {
  useContactInfo,
  useVisitUsFeatures,
  type VisitUsFeature,
} from "@/hooks/useAdminData";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { FourDotsLoader } from "@/components/admin/FourDotsLoader";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";
import ImageUploader from "@/components/admin/ImageUploader";

type ContactFormState = {
  address: string;
  phone: string;
  email: string;
  description: string;
  hours: string;
  visitHeroImageUrl: string;
  visitHeroPublicId: string;
  visitHeroEyebrow: string;
  visitHeroTitle: string;
  visitHeroDescription: string;
  visitDirectionsUrl: string;
  visitFeaturesHeading: string;
  visitFeaturesSubtitle: string;
  visitWelcomeHeading: string;
  visitWelcomeBody: string;
  visitOwnerName: string;
  visitOwnerRole: string;
  visitOwnerImageUrl: string;
  visitOwnerPublicId: string;
  visitWelcomeLocationLine: string;
  visitWelcomeHoursLine: string;
};

const SOCIAL_PLATFORM_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter / X" },
  { value: "youtube", label: "YouTube" },
  { value: "linkedin", label: "LinkedIn" },
] as const;

const emptyForm: ContactFormState = {
  address: "",
  phone: "",
  email: "",
  description: "",
  hours: "",
  visitHeroImageUrl: "",
  visitHeroPublicId: "",
  visitHeroEyebrow: "",
  visitHeroTitle: "",
  visitHeroDescription: "",
  visitDirectionsUrl: "",
  visitFeaturesHeading: "",
  visitFeaturesSubtitle: "",
  visitWelcomeHeading: "",
  visitWelcomeBody: "",
  visitOwnerName: "",
  visitOwnerRole: "",
  visitOwnerImageUrl: "",
  visitOwnerPublicId: "",
  visitWelcomeLocationLine: "",
  visitWelcomeHoursLine: "",
};

export default function ContactInfoAdminPage() {
  const { data, loading, updateItem, refetch } = useContactInfo();
  const {
    data: features,
    loading: featuresLoading,
    createItem,
    updateItem: updateFeature,
    deleteItem: deleteFeature,
  } = useVisitUsFeatures();

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ContactFormState>(emptyForm);
  const [heroUploaded, setHeroUploaded] = useState<{
    imageUrl: string;
    publicId: string;
  } | null>(null);
  const [ownerUploaded, setOwnerUploaded] = useState<{
    imageUrl: string;
    publicId: string;
  } | null>(null);

  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([]);

  const [featEditingId, setFeatEditingId] = useState<string | null>(null);
  const [featCreating, setFeatCreating] = useState(false);
  const [featSaving, setFeatSaving] = useState(false);
  const [featTitle, setFeatTitle] = useState("");
  const [featDescription, setFeatDescription] = useState("");
  const [featSort, setFeatSort] = useState("0");
  const [featCurrentImage, setFeatCurrentImage] = useState<string | null>(null);
  const [featUploaded, setFeatUploaded] = useState<{
    imageUrl: string;
    publicId: string;
  } | null>(null);

  useEffect(() => {
    if (!data) return;
    setForm({
      address: data.address || "",
      phone: data.phone || "",
      email: data.email || "",
      description: data.description || "",
      hours: data.hours || "",
      visitHeroImageUrl: data.visitHeroImageUrl || "",
      visitHeroPublicId: data.visitHeroPublicId || "",
      visitHeroEyebrow: data.visitHeroEyebrow || "",
      visitHeroTitle: data.visitHeroTitle || "",
      visitHeroDescription: data.visitHeroDescription || "",
      visitDirectionsUrl: data.visitDirectionsUrl || "",
      visitFeaturesHeading: data.visitFeaturesHeading || "",
      visitFeaturesSubtitle: data.visitFeaturesSubtitle || "",
      visitWelcomeHeading: data.visitWelcomeHeading || "",
      visitWelcomeBody: data.visitWelcomeBody || "",
      visitOwnerName: data.visitOwnerName || "",
      visitOwnerRole: data.visitOwnerRole || "",
      visitOwnerImageUrl: data.visitOwnerImageUrl || "",
      visitOwnerPublicId: data.visitOwnerPublicId || "",
      visitWelcomeLocationLine: data.visitWelcomeLocationLine || "",
      visitWelcomeHoursLine: data.visitWelcomeHoursLine || "",
    });
    setSocialLinks(
      Array.isArray(data.socialLinks)
        ? data.socialLinks.map((row) => ({
            platform: String((row as { platform?: string }).platform || "instagram"),
            url: String((row as { url?: string }).url || ""),
          }))
        : []
    );
  }, [data]);

  const resetFeatureForm = () => {
    setFeatEditingId(null);
    setFeatCreating(false);
    setFeatTitle("");
    setFeatDescription("");
    setFeatSort("0");
    setFeatCurrentImage(null);
    setFeatUploaded(null);
  };

  const openEditFeature = (item: VisitUsFeature) => {
    setFeatEditingId(item.id);
    setFeatCreating(false);
    setFeatTitle(item.title);
    setFeatDescription(item.description || "");
    setFeatSort(String(item.sortOrder ?? 0));
    setFeatCurrentImage(item.imageUrl);
    setFeatUploaded(null);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let visitHeroImageUrl = form.visitHeroImageUrl;
      let visitHeroPublicId = form.visitHeroPublicId;
      if (heroUploaded) {
        if (heroUploaded.imageUrl === "") {
          visitHeroImageUrl = "";
          visitHeroPublicId = "";
        } else {
          visitHeroImageUrl = heroUploaded.imageUrl;
          visitHeroPublicId = heroUploaded.publicId;
        }
      }
      let visitOwnerImageUrl = form.visitOwnerImageUrl;
      let visitOwnerPublicId = form.visitOwnerPublicId;
      if (ownerUploaded) {
        if (ownerUploaded.imageUrl === "") {
          visitOwnerImageUrl = "";
          visitOwnerPublicId = "";
        } else {
          visitOwnerImageUrl = ownerUploaded.imageUrl;
          visitOwnerPublicId = ownerUploaded.publicId;
        }
      }
      const cleanedSocials = socialLinks
        .map((s) => ({
          platform: s.platform.trim().toLowerCase(),
          url: s.url.trim(),
        }))
        .filter((s) => s.platform.length > 0 && s.url.length > 0);

      const res = await updateItem(null, {
        ...form,
        visitHeroImageUrl,
        visitHeroPublicId,
        visitOwnerImageUrl,
        visitOwnerPublicId,
        socialLinks: cleanedSocials,
      });
      if (!res.success) throw new Error(res.message || "Save failed");
      toast.success("Saved successfully");
      setHeroUploaded(null);
      setOwnerUploaded(null);
      await refetch();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleFeatureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeatSaving(true);
    try {
      let imageUrl = featCurrentImage || "";
      const payload: Record<string, unknown> = {
        title: featTitle.trim(),
        description: featDescription.trim(),
        sortOrder: Math.round(Number(featSort) || 0),
        imageUrl,
      };
      if (featUploaded) {
        if (featUploaded.imageUrl === "") {
          payload.imageUrl = "";
          payload.cloudinaryPublicId = "";
        } else {
          payload.imageUrl = featUploaded.imageUrl;
          payload.cloudinaryPublicId = featUploaded.publicId;
        }
      }
      if (featCreating) {
        const res = await createItem(payload);
        if (!res.success) throw new Error(res.message || "Save failed");
      } else if (featEditingId) {
        const res = await updateFeature(featEditingId, payload);
        if (!res.success) throw new Error(res.message || "Save failed");
      }
      toast.success("Feature saved");
      resetFeatureForm();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setFeatSaving(false);
    }
  };

  const handleDeleteFeature = async (id: string) => {
    if (!window.confirm("Delete this feature card?")) return;
    setFeatSaving(true);
    try {
      const res = await deleteFeature(id);
      if (!res.success) throw new Error(res.message || "Delete failed");
      toast.success("Deleted");
      resetFeatureForm();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setFeatSaving(false);
    }
  };

  if (loading && !data) return <AdminLoadingState message="Loading contact info…" />;

  const featureFormOpen = featCreating || featEditingId !== null;

  return (
    <div className="w-full min-w-0 space-y-10">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Visit us", href: "/admin/contact" },
          { label: "Page & location" },
        ]}
      />
      <div>
        <h1 className="mb-1 text-2xl font-semibold text-neutral-900">Visit us</h1>
        <p className="text-sm text-neutral-500">
          Flagship address, hours, footer social links, visit hero, welcome strip, “Experience”
          section, and feature cards.
        </p>
      </div>

      <form
        onSubmit={handleContactSubmit}
        className="space-y-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <div>
          <h2 className="mb-4 text-sm font-semibold text-neutral-800">Location & channels</h2>
          <div className="space-y-5">
            {(
              [
                { key: "address", label: "Address", type: "textarea" },
                { key: "phone", label: "Phone", type: "input" },
                { key: "email", label: "Email", type: "input" },
                { key: "hours", label: "Opening hours", type: "input" },
                { key: "description", label: "Internal notes", type: "textarea" },
              ] as const
            ).map(({ key, label, type }) => (
              <div key={key}>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 transition-colors focus:border-[#C8773A] focus:outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 transition-colors focus:border-[#C8773A] focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-8">
          <h2 className="mb-2 text-sm font-semibold text-neutral-800">Footer — social links</h2>
          <p className="mb-4 text-xs text-neutral-500">
            Icons and URLs for the site footer. Only entries with both platform and URL are saved.
            Links open in a new tab.
          </p>
          <div className="space-y-3">
            {socialLinks.map((row, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-50/80 p-4 sm:flex-row sm:items-end"
              >
                <div className="min-w-0 flex-1">
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Platform
                  </label>
                  <select
                    value={row.platform}
                    onChange={(e) => {
                      const next = [...socialLinks];
                      next[index] = { ...next[index], platform: e.target.value };
                      setSocialLinks(next);
                    }}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-[#C8773A] focus:outline-none"
                  >
                    {!SOCIAL_PLATFORM_OPTIONS.some((o) => o.value === row.platform) &&
                    row.platform.trim() ? (
                      <option value={row.platform}>{row.platform}</option>
                    ) : null}
                    {SOCIAL_PLATFORM_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="min-w-0 flex-[2]">
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    URL
                  </label>
                  <input
                    type="text"
                    value={row.url}
                    onChange={(e) => {
                      const next = [...socialLinks];
                      next[index] = { ...next[index], url: e.target.value };
                      setSocialLinks(next);
                    }}
                    placeholder="https://instagram.com/yourshop"
                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm focus:border-[#C8773A] focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== index))}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  aria-label="Remove social link"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setSocialLinks([...socialLinks, { platform: "instagram", url: "" }])
              }
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-neutral-300 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-600 transition hover:border-[#C8773A]/50 hover:text-[#C8773A]"
            >
              <Plus className="h-4 w-4" />
              Add social link
            </button>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-8">
          <h2 className="mb-4 text-sm font-semibold text-neutral-800">Visit page — hero</h2>
          <p className="mb-4 text-xs text-neutral-500">
            Full-width image and overlay copy above the fold on{" "}
            <span className="font-medium text-neutral-700">/visit-us</span>.
          </p>
          <ImageUploader
            onUploadSuccess={setHeroUploaded}
            defaultImage={form.visitHeroImageUrl || undefined}
          />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Location label (eyebrow)
              </label>
              <input
                type="text"
                value={form.visitHeroEyebrow}
                onChange={(e) => setForm({ ...form, visitHeroEyebrow: e.target.value })}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Headline
              </label>
              <input
                type="text"
                value={form.visitHeroTitle}
                onChange={(e) => setForm({ ...form, visitHeroTitle: e.target.value })}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Description
              </label>
              <textarea
                rows={4}
                value={form.visitHeroDescription}
                onChange={(e) => setForm({ ...form, visitHeroDescription: e.target.value })}
                className="w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Get directions URL
              </label>
              <input
                type="url"
                value={form.visitDirectionsUrl}
                onChange={(e) => setForm({ ...form, visitDirectionsUrl: e.target.value })}
                placeholder="https://maps.google.com/..."
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-8">
          <h2 className="mb-4 text-sm font-semibold text-neutral-800">Visit page — welcome strip</h2>
          <p className="mb-4 text-xs text-neutral-500">
            Section with headline, message, owner block, and the three pills (maps uses{" "}
            <span className="font-medium text-neutral-700">Get directions URL</span> above; phone and
            hours use location fields when not overridden).
          </p>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Headline (use line break for two lines)
              </label>
              <textarea
                rows={2}
                value={form.visitWelcomeHeading}
                onChange={(e) => setForm({ ...form, visitWelcomeHeading: e.target.value })}
                placeholder={"We'd Love to\nWelcome You."}
                className="w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Message
              </label>
              <textarea
                rows={4}
                value={form.visitWelcomeBody}
                onChange={(e) => setForm({ ...form, visitWelcomeBody: e.target.value })}
                className="w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Owner name
                </label>
                <input
                  type="text"
                  value={form.visitOwnerName}
                  onChange={(e) => setForm({ ...form, visitOwnerName: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Owner title / role
                </label>
                <input
                  type="text"
                  value={form.visitOwnerRole}
                  onChange={(e) => setForm({ ...form, visitOwnerRole: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Owner photo
              </label>
              <ImageUploader
                onUploadSuccess={setOwnerUploaded}
                defaultImage={form.visitOwnerImageUrl || undefined}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  “Find us” line (under FIND US AT)
                </label>
                <input
                  type="text"
                  value={form.visitWelcomeLocationLine}
                  onChange={(e) => setForm({ ...form, visitWelcomeLocationLine: e.target.value })}
                  placeholder="Short location summary"
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  “Open daily” line (under OPEN DAILY)
                </label>
                <input
                  type="text"
                  value={form.visitWelcomeHoursLine}
                  onChange={(e) => setForm({ ...form, visitWelcomeHoursLine: e.target.value })}
                  placeholder="e.g. 9:00 AM – 10:00 PM"
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-8">
          <h2 className="mb-4 text-sm font-semibold text-neutral-800">
            Visit page — “Experience” section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Section heading
              </label>
              <input
                type="text"
                value={form.visitFeaturesHeading}
                onChange={(e) => setForm({ ...form, visitFeaturesHeading: e.target.value })}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Section subtitle
              </label>
              <textarea
                rows={3}
                value={form.visitFeaturesSubtitle}
                onChange={(e) => setForm({ ...form, visitFeaturesSubtitle: e.target.value })}
                className="w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm focus:border-[#C8773A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-neutral-100 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#C8773A] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#b5692e] disabled:opacity-50"
          >
            {saving ? (
              <>
                <FourDotsLoader size="sm" aria-label="Saving" />
                Saving…
              </>
            ) : (
              "Save visit page & contact"
            )}
          </button>
        </div>
      </form>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
              <LayoutGrid className="h-4 w-4 text-[#C8773A]" />
              Feature cards
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              Three cards under the Experience section (image, title, caption). Order by sort.
            </p>
          </div>
          {!featureFormOpen && (
            <button
              type="button"
              onClick={() => {
                resetFeatureForm();
                setFeatCreating(true);
              }}
              className="shrink-0 rounded-lg bg-[#C8773A] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-[#b5692e]"
            >
              + Add card
            </button>
          )}
        </div>

        {featureFormOpen && (
          <form
            onSubmit={handleFeatureSubmit}
            className="mb-6 space-y-4 rounded-lg border border-neutral-100 bg-neutral-50/50 p-5"
          >
            <h3 className="text-sm font-medium text-neutral-800">
              {featCreating ? "New card" : "Edit card"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-[10px] font-semibold uppercase text-neutral-400">
                  Title
                </label>
                <input
                  required
                  value={featTitle}
                  onChange={(e) => setFeatTitle(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-[10px] font-semibold uppercase text-neutral-400">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={featDescription}
                  onChange={(e) => setFeatDescription(e.target.value)}
                  className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase text-neutral-400">
                  Sort order
                </label>
                <input
                  type="number"
                  value={featSort}
                  onChange={(e) => setFeatSort(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>
            <ImageUploader
              onUploadSuccess={setFeatUploaded}
              defaultImage={featCurrentImage || undefined}
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetFeatureForm}
                className="text-xs text-neutral-500 hover:text-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={featSaving || !featTitle.trim()}
                className="rounded-lg bg-[#C8773A] px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {featSaving ? "Saving…" : "Save card"}
              </button>
            </div>
          </form>
        )}

        {featuresLoading && (!features || features.length === 0) ? (
          <p className="text-sm text-neutral-500">Loading cards…</p>
        ) : !features || features.length === 0 ? (
          <p className="text-sm text-neutral-500">No cards yet. Add one or run the content migrate script.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Image
                  </th>
                  <th className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Title
                  </th>
                  <th className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Sort
                  </th>
                  <th className="py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {features.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 pr-4">
                      {item.imageUrl ? (
                        <div className="relative h-11 w-11 overflow-hidden rounded-md">
                          <Image
                            src={item.imageUrl}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-11 w-11 rounded-md bg-neutral-100" />
                      )}
                    </td>
                    <td className="py-3 pr-4 font-medium text-neutral-800">{item.title}</td>
                    <td className="py-3 pr-4 tabular-nums text-neutral-600">{item.sortOrder}</td>
                    <td className="space-x-3 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => openEditFeature(item)}
                        className="text-xs font-semibold text-[#C8773A] hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFeature(item.id)}
                        className="text-xs font-semibold text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
