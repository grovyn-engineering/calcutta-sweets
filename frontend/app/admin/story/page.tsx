"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useStory, type StoryCraftStep, type StoryFamilyMember } from "@/hooks/useAdminData";
import ImageUploader from "@/components/admin/ImageUploader";
import TimelineEditor from "@/components/admin/TimelineEditor";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

const emptyCraftSteps = (): StoryCraftStep[] =>
  Array.from({ length: 3 }, () => ({ icon: "", title: "", description: "" }));

const emptyFamily = (): StoryFamilyMember[] =>
  Array.from({ length: 3 }, () => ({ name: "", title: "", description: "", image: "" }));

export default function StoryAdminPage() {
  const { data, loading, error, updateItem } = useStory();

  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [currentPublicId, setCurrentPublicId] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ imageUrl: string; publicId: string } | null>(null);

  const [heroEyebrow, setHeroEyebrow] = useState("");
  const [craftOverline, setCraftOverline] = useState("");
  const [craftHeadline, setCraftHeadline] = useState("");
  const [currentCraftImage, setCurrentCraftImage] = useState<string | null>(null);
  const [currentCraftPublicId, setCurrentCraftPublicId] = useState<string | null>(null);
  const [uploadedCraftImage, setUploadedCraftImage] = useState<{ imageUrl: string; publicId: string } | null>(null);
  const [craftSteps, setCraftSteps] = useState<StoryCraftStep[]>(emptyCraftSteps);

  const [timelineTitle, setTimelineTitle] = useState("");
  const [timelineSubtitle, setTimelineSubtitle] = useState("");
  const [familySectionTitle, setFamilySectionTitle] = useState("");
  const [familyMembers, setFamilyMembers] = useState<StoryFamilyMember[]>(emptyFamily());
  const [quoteText, setQuoteText] = useState("");
  const [quoteAttribution, setQuoteAttribution] = useState("");

  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    setTitle(data.title || "");
    setContent(data.content || "");
    setCurrentImage(data.imageUrl || null);
    setCurrentPublicId(data.publicId || null);
    setHeroEyebrow(data.heroEyebrow || "");
    setCraftOverline(data.craftOverline || "");
    setCraftHeadline(data.craftHeadline || "");
    setCurrentCraftImage(data.craftImageUrl || null);
    setCurrentCraftPublicId(data.craftPublicId || null);
    setTimelineTitle(data.timelineTitle || "");
    setTimelineSubtitle(data.timelineSubtitle || "");
    setFamilySectionTitle(data.familySectionTitle || "");
    const steps = Array.isArray(data.craftSteps) && data.craftSteps.length > 0
      ? data.craftSteps.map((s) => ({
          icon: s.icon || "",
          title: s.title || "",
          description: s.description || "",
        }))
      : emptyCraftSteps();
    while (steps.length < 3) steps.push({ icon: "", title: "", description: "" });
    setCraftSteps(steps.slice(0, 6));
    const fam = Array.isArray(data.familyMembers) && data.familyMembers.length > 0
      ? data.familyMembers.map((m) => ({
          name: m.name || "",
          title: m.title || "",
          description: m.description || "",
          image: m.image || "",
        }))
      : emptyFamily();
    while (fam.length < 3) fam.push({ name: "", title: "", description: "", image: "" });
    setFamilyMembers(fam.slice(0, 6));
    setQuoteText(data.quoteText || "");
    setQuoteAttribution(data.quoteAttribution || "");
  }, [data]);

  const updateCraftStep = (i: number, patch: Partial<StoryCraftStep>) => {
    setCraftSteps((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      return next;
    });
  };

  const updateFamilyMember = (i: number, patch: Partial<StoryFamilyMember>) => {
    setFamilyMembers((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError("Headline is required.");
      return;
    }

    if (!content.trim()) {
      setFormError("Story content cannot be empty.");
      return;
    }

    setSaving(true);

    let finalImageUrl = currentImage || "";
    let finalPublicId = currentPublicId || "";
    if (uploadedImage) {
      finalImageUrl = uploadedImage.imageUrl;
      finalPublicId = uploadedImage.publicId;
    }

    let finalCraftUrl = currentCraftImage || "";
    let finalCraftPid = currentCraftPublicId || "";
    if (uploadedCraftImage) {
      finalCraftUrl = uploadedCraftImage.imageUrl;
      finalCraftPid = uploadedCraftImage.publicId;
    }

    const trimmedSteps = craftSteps
      .map((s) => ({
        icon: s.icon.trim(),
        title: s.title.trim(),
        description: s.description.trim(),
      }))
      .filter((s) => s.title || s.description);

    const trimmedFamily = familyMembers
      .map((m) => ({
        name: m.name.trim(),
        title: m.title.trim(),
        description: m.description.trim(),
        image: m.image.trim(),
      }))
      .filter((m) => m.name || m.image);

    const payload = {
      title: title.trim(),
      content: content.trim(),
      imageUrl: finalImageUrl,
      cloudinaryPublicId: finalPublicId,
      previousPublicId: currentPublicId || "",
      heroEyebrow: heroEyebrow.trim() || null,
      craftOverline: craftOverline.trim() || null,
      craftHeadline: craftHeadline.trim() || null,
      craftImageUrl: finalCraftUrl || null,
      craftPublicId: finalCraftPid || null,
      craftSteps: trimmedSteps,
      timelineTitle: timelineTitle.trim() || null,
      timelineSubtitle: timelineSubtitle.trim() || null,
      familySectionTitle: familySectionTitle.trim() || null,
      familyMembers: trimmedFamily,
      quoteText: quoteText.trim() || null,
      quoteAttribution: quoteAttribution.trim() || null,
    };

    try {
      await updateItem(data?.id ?? null, payload);

      toast.success("Story saved successfully ✨");

      setUploadedImage(null);
      setCurrentImage(finalImageUrl);
      setCurrentPublicId(finalPublicId);
      setUploadedCraftImage(null);
      setCurrentCraftImage(finalCraftUrl);
      setCurrentCraftPublicId(finalCraftPid);
    } catch (err: unknown) {
      console.error(err);

      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while saving.";

      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoadingState message="Loading story…" />;

  if (error) {
    return (
      <div className="w-full rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load story: {error}
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Story", href: "/admin/story" },
          { label: "Content & timeline" },
        ]}
      />
      <h1 className="text-2xl font-semibold text-brand-brown mb-1">
        Our Story
      </h1>
      <p className="text-sm text-brand-brown/50 italic mb-8">
        Hero, craft section, timeline headings, and family cards are stored with this record. Timeline rows are edited below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && (
          <div className="text-red-600 text-xs bg-red-50 border border-red-200 px-3 py-2 rounded">
            {formError}
          </div>
        )}

        <div className="bg-white border border-brand-brown/8 rounded-lg p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">
              Hero eyebrow (small caps line)
            </label>
            <input
              type="text"
              value={heroEyebrow}
              disabled={saving}
              onChange={(e) => setHeroEyebrow(e.target.value)}
              placeholder="CALCUTTA SWEETS"
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm focus:outline-none focus:border-[#C8773A] transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">
              Headline
            </label>
            <textarea
              rows={3}
              value={title}
              disabled={saving}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm focus:outline-none focus:border-[#C8773A] transition-colors resize-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">
              Story Text
            </label>
            <textarea
              rows={6}
              value={content}
              disabled={saving}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm focus:outline-none focus:border-[#C8773A] transition-colors resize-none disabled:opacity-50"
            />
          </div>
        </div>

        <div className="bg-white border border-brand-brown/8 rounded-lg p-6 shadow-sm">
          <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-4">
            Main Image
          </label>

          <ImageUploader
            onUploadSuccess={(img) => {
              setUploadedImage(img);
              toast.success("Image uploaded successfully 📸");
            }}
            defaultImage={currentImage || undefined}
          />
        </div>

        <div className="bg-white border border-brand-brown/8 rounded-lg p-6 shadow-sm space-y-5">
          <h2 className="text-sm font-semibold text-brand-brown">“How we make it” section</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">Overline</label>
              <input type="text" value={craftOverline} disabled={saving} onChange={(e) => setCraftOverline(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm focus:outline-none focus:border-[#C8773A]" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">Headline (use \n for line break)</label>
              <textarea rows={2} value={craftHeadline} disabled={saving} onChange={(e) => setCraftHeadline(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm focus:outline-none focus:border-[#C8773A] resize-none" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">Section image</label>
            <ImageUploader
              onUploadSuccess={setUploadedCraftImage}
              defaultImage={currentCraftImage || undefined}
            />
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase">Steps (up to {craftSteps.length} rows)</p>
            {craftSteps.map((step, i) => (
              <div key={i} className="rounded-lg border border-brand-brown/10 p-4 space-y-2 bg-[#FAF3E8]/30">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input placeholder="Icon (emoji, optional)" value={step.icon} disabled={saving}
                    onChange={(e) => updateCraftStep(i, { icon: e.target.value })}
                    className="px-3 py-2 rounded border border-brand-brown/10 text-sm" />
                  <input placeholder="Title" value={step.title} disabled={saving}
                    onChange={(e) => updateCraftStep(i, { title: e.target.value })}
                    className="px-3 py-2 rounded border border-brand-brown/10 text-sm sm:col-span-2" />
                </div>
                <textarea placeholder="Description" value={step.description} disabled={saving} rows={2}
                  onChange={(e) => updateCraftStep(i, { description: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-brand-brown/10 text-sm resize-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-brand-brown/8 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-brand-brown">Timeline section headings</h2>
          <p className="text-xs text-brand-brown/50">Milestone rows are managed in the timeline editor below.</p>
          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">Title</label>
            <input type="text" value={timelineTitle} disabled={saving} onChange={(e) => setTimelineTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm" />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">Subtitle</label>
            <textarea rows={3} value={timelineSubtitle} disabled={saving} onChange={(e) => setTimelineSubtitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm resize-none" />
          </div>
        </div>

        <div className="bg-white border border-brand-brown/8 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-brand-brown">Family section</h2>
          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">Section title (\n for line break)</label>
            <textarea rows={2} value={familySectionTitle} disabled={saving} onChange={(e) => setFamilySectionTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm resize-none" />
          </div>
          {familyMembers.map((m, i) => (
            <div key={i} className="rounded-lg border border-brand-brown/10 p-4 space-y-2 bg-[#FAF3E8]/30">
              <p className="text-[10px] font-bold text-brand-brown/50 uppercase">Person {i + 1}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                <input placeholder="Name" value={m.name} disabled={saving} onChange={(e) => updateFamilyMember(i, { name: e.target.value })}
                  className="px-3 py-2 rounded border border-brand-brown/10 text-sm" />
                <input placeholder="Role / title" value={m.title} disabled={saving} onChange={(e) => updateFamilyMember(i, { title: e.target.value })}
                  className="px-3 py-2 rounded border border-brand-brown/10 text-sm" />
              </div>
              <textarea placeholder="Description" value={m.description} disabled={saving} rows={2} onChange={(e) => updateFamilyMember(i, { description: e.target.value })}
                className="w-full px-3 py-2 rounded border border-brand-brown/10 text-sm resize-none" />
              <input placeholder="Image path e.g. /images/chef1.jpg" value={m.image} disabled={saving} onChange={(e) => updateFamilyMember(i, { image: e.target.value })}
                className="w-full px-3 py-2 rounded border border-brand-brown/10 text-sm" />
            </div>
          ))}
        </div>

        <div className="bg-white border border-brand-brown/8 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-brand-brown">Closing quote (bottom of Story page)</h2>
          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">Quote</label>
            <textarea
              rows={4}
              value={quoteText}
              disabled={saving}
              onChange={(e) => setQuoteText(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-brand-brown/50 tracking-widest uppercase mb-2">Attribution</label>
            <input
              type="text"
              value={quoteAttribution}
              disabled={saving}
              onChange={(e) => setQuoteAttribution(e.target.value)}
              placeholder="THE FOUNDING FAMILY"
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-brand-brown/10 rounded text-brand-brown text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold tracking-widest uppercase rounded transition-colors disabled:opacity-50"
          >
            {saving ? "Saving changes..." : "Save Story"}
          </button>
        </div>
      </form>

      <TimelineEditor />
    </div>
  );
}
