"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useCelebrationHero } from "@/hooks/useAdminData";
import ImageUploader from "@/components/admin/ImageUploader";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

export default function CelebrationHeroAdminPage() {
  const { data, loading, updateItem } = useCelebrationHero();
  const [saving, setSaving] = useState(false);

  const [eyebrow, setEyebrow] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const [mainUrl, setMainUrl] = useState<string | null>(null);
  const [mainPid, setMainPid] = useState<string | null>(null);
  const [mainUploaded, setMainUploaded] = useState<{ imageUrl: string; publicId: string } | null>(null);

  const [leftUrl, setLeftUrl] = useState<string | null>(null);
  const [leftPid, setLeftPid] = useState<string | null>(null);
  const [leftUploaded, setLeftUploaded] = useState<{ imageUrl: string; publicId: string } | null>(null);

  const [rightUrl, setRightUrl] = useState<string | null>(null);
  const [rightPid, setRightPid] = useState<string | null>(null);
  const [rightUploaded, setRightUploaded] = useState<{ imageUrl: string; publicId: string } | null>(null);

  useEffect(() => {
    if (!data) return;
    setEyebrow(data.eyebrow || "");
    setTitle(data.title || "");
    setSubtitle(data.subtitle || "");
    setMainUrl(data.mainImageUrl || null);
    setMainPid(data.mainPublicId || null);
    setLeftUrl(data.secondaryLeftUrl || null);
    setLeftPid(data.secondaryLeftPublicId || null);
    setRightUrl(data.secondaryRightUrl || null);
    setRightPid(data.secondaryRightPublicId || null);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const resolveTriple = (
      currentUrl: string | null,
      currentPid: string | null,
      uploaded: { imageUrl: string; publicId: string } | null
    ) => {
      if (uploaded) {
        if (uploaded.imageUrl === "") return { url: "", pid: "" };
        return { url: uploaded.imageUrl, pid: uploaded.publicId };
      }
      return { url: currentUrl || "", pid: currentPid || "" };
    };

    const main = resolveTriple(mainUrl, mainPid, mainUploaded);
    const left = resolveTriple(leftUrl, leftPid, leftUploaded);
    const right = resolveTriple(rightUrl, rightPid, rightUploaded);

    const payload = {
      eyebrow,
      title,
      subtitle,
      mainImageUrl: main.url,
      mainPublicId: main.pid || null,
      secondaryLeftUrl: left.url,
      secondaryLeftPublicId: left.pid || null,
      secondaryRightUrl: right.url,
      secondaryRightPublicId: right.pid || null,
    };

    try {
      await updateItem(null, payload);
      toast.success("Saved successfully");
      setMainUploaded(null);
      setLeftUploaded(null);
      setRightUploaded(null);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoadingState message="Loading celebration hero…" />;

  return (
    <div className="w-full min-w-0">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Celebration hero", href: "/admin/celebration-hero" },
          { label: "Edit" },
        ]}
      />
      <h1 className="text-2xl font-semibold text-[#3E2F26] mb-1">Celebration page hero</h1>
      <p className="text-sm text-[#3E2F26]/50 mb-8">
        Headline, copy, and the three images at the top of the celebrations page.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-[#3E2F26]/8 rounded-lg p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">
              Eyebrow
            </label>
            <input
              type="text"
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors"
            />
            <p className="mt-1.5 text-[11px] text-[#3E2F26]/40">
              The last word is highlighted in orange on the site.
            </p>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-2">
              Subtitle
            </label>
            <textarea
              rows={4}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/10 rounded text-[#3E2F26] text-sm focus:outline-none focus:border-[#C8773A] transition-colors resize-none"
            />
          </div>
        </div>

        <div className="bg-white border border-[#3E2F26]/8 rounded-lg p-6 shadow-sm space-y-8">
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-4">
              Main image (large, top)
            </label>
            <ImageUploader
              onUploadSuccess={setMainUploaded}
              defaultImage={mainUrl || undefined}
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-4">
              Bottom left image
            </label>
            <ImageUploader
              onUploadSuccess={setLeftUploaded}
              defaultImage={leftUrl || undefined}
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-[#3E2F26]/50 tracking-widest uppercase mb-4">
              Bottom right image
            </label>
            <ImageUploader
              onUploadSuccess={setRightUploaded}
              defaultImage={rightUrl || undefined}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving || !title}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C8773A] hover:bg-[#b5692e] text-white text-xs font-semibold tracking-widest uppercase rounded transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
