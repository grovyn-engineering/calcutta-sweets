"use client";

import { useState } from "react";
import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import toast from "react-hot-toast";
import { useMenuProductsManage, type MenuProduct } from "@/hooks/useAdminData";
import ImageUploader from "@/components/admin/ImageUploader";
import { AdminLoadingState } from "@/components/admin/AdminLoadingState";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

type InventoryMarketingItem = {
  inventoryProductId: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  categoryLabel: string;
  imageUrl: string | null;
};

const inventoryApiBase = (process.env.NEXT_PUBLIC_INVENTORY_API_URL || "").replace(/\/$/, "");
const inventoryShopCode = process.env.NEXT_PUBLIC_INVENTORY_SHOP_CODE || "SH000001";

export default function MenuProductsAdminPage() {
  const { data, loading, createItem, updateItem, deleteItem, refetch } = useMenuProductsManage();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [unit, setUnit] = useState("200g");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isActive, setIsActive] = useState(true);
  const [isSignature, setIsSignature] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ imageUrl: string; publicId: string } | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setIsCreating(false);
    setName("");
    setDescription("");
    setPrice("0");
    setUnit("200g");
    setCategory("");
    setSortOrder("0");
    setIsActive(true);
    setIsSignature(false);
    setCurrentImage(null);
    setUploadedImage(null);
  };

  const handleEdit = (item: MenuProduct) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description || "");
    setPrice(String(item.price));
    setUnit(item.unit || "200g");
    setCategory(item.category);
    setSortOrder(String(item.sortOrder ?? 0));
    setIsActive(item.isActive);
    setIsSignature(item.isSignature);
    setCurrentImage(item.imageUrl);
    setUploadedImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    let finalImageUrl = currentImage || "";
    const payload: Record<string, unknown> = {
      name: name.trim(),
      description: description.trim(),
      price: Math.max(0, Math.round(Number(price) || 0)),
      unit: unit.trim() || "200g",
      category: category.trim(),
      sortOrder: Math.round(Number(sortOrder) || 0),
      isActive,
      isSignature,
      imageUrl: finalImageUrl,
    };

    if (uploadedImage) {
      if (uploadedImage.imageUrl === "") {
        payload.imageUrl = "";
        payload.cloudinaryPublicId = "";
      } else {
        payload.imageUrl = uploadedImage.imageUrl;
        payload.cloudinaryPublicId = uploadedImage.publicId;
      }
    }

    try {
      if (isCreating) {
        const res = await createItem(payload);
        if (!res.success) throw new Error(res.message || "Save failed");
      } else if (editingId) {
        const res = await updateItem(editingId, payload);
        if (!res.success) throw new Error(res.message || "Save failed");
      }
      toast.success("Saved");
      resetForm();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this menu item?")) return;
    setSaving(true);
    try {
      const res = await deleteItem(id);
      if (!res.success) throw new Error(res.message || "Delete failed");
      toast.success("Deleted");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleSyncFromInventory = async () => {
    if (!inventoryApiBase) {
      toast.error("Set NEXT_PUBLIC_INVENTORY_API_URL (e.g. https://your-api.onrender.com/api)");
      return;
    }
    setSyncing(true);
    let created = 0;
    let updated = 0;
    try {
      const url = `${inventoryApiBase}/public/marketing-sweets/${encodeURIComponent(inventoryShopCode)}`;
      // no-store avoids 304 + empty body; avoid extra request headers so the GET stays CORS-“simple” (no preflight).
      const res = await fetch(url, { cache: "no-store" });
      const json = (await res.json().catch(() => null)) as
        | { items?: InventoryMarketingItem[]; message?: string }
        | null;
      if (!res.ok) {
        const msg =
          json && typeof json === "object" && "message" in json && typeof json.message === "string"
            ? json.message
            : res.statusText;
        throw new Error(msg || "Inventory request failed");
      }
      if (!json || typeof json !== "object") {
        throw new Error("Inventory returned an empty or invalid response. Try again.");
      }
      const items = Array.isArray(json.items) ? json.items : [];
      if (items.length === 0) {
        toast("No Sweets items returned from inventory (check shop code and listings).", {
          icon: "ℹ️",
        });
        await refetch();
        return;
      }

      const origin = inventoryApiBase.replace(/\/api\/?$/i, "");
      const byInventoryId = new Map(
        (data ?? [])
          .filter((m): m is MenuProduct & { inventoryProductId: string } => Boolean(m.inventoryProductId))
          .map((m) => [m.inventoryProductId, m]),
      );

      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        let imageUrl = it.imageUrl ?? "";
        if (imageUrl.startsWith("/") && origin) {
          imageUrl = `${origin}${imageUrl}`;
        }

        const payload: Record<string, unknown> = {
          name: it.name.trim(),
          description: (it.description || "").trim(),
          price: Math.max(0, Math.round(Number(it.price) || 0)),
          unit: (it.unit || "200g").trim() || "200g",
          category: (it.categoryLabel || "Sweets").trim() || "Sweets",
          imageUrl,
          inventoryProductId: it.inventoryProductId,
          sortOrder: i,
          isActive: true,
          isSignature: false,
        };

        const existing = byInventoryId.get(it.inventoryProductId);
        if (!existing) {
          payload.cloudinaryPublicId = "";
        }

        if (existing) {
          const out = await updateItem(existing.id, payload);
          if (!out.success) throw new Error(out.message || "Update failed");
          updated += 1;
        } else {
          const out = await createItem(payload);
          if (!out.success) throw new Error(out.message || "Create failed");
          created += 1;
        }
      }

      toast.success(`Synced ${items.length} sweets (${created} new, ${updated} updated)`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  if (loading && (!data || data.length === 0)) {
    return <AdminLoadingState message="Loading menu…" />;
  }

  const isFormOpen = isCreating || editingId !== null;

  return (
    <div className="w-full min-w-0">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          isFormOpen
            ? { label: "Menu", onNavigate: resetForm }
            : { label: "Menu", href: "/admin/menu-products" },
          ...(isFormOpen ? [{ label: isCreating ? "New item" : "Edit item" }] : []),
        ]}
      />
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-semibold text-[#3E2F26]">Menu products</h1>
          <p className="mt-1 max-w-xl text-sm text-[#3E2F26]/50">
            Items shown on the public menu page and product detail URLs.
          </p>
        </div>
        {!isFormOpen && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSyncFromInventory}
              disabled={syncing || saving}
              className="rounded border border-[#C8773A]/40 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#C8773A] transition-colors hover:bg-[#FAF3E8] disabled:opacity-50"
            >
              {syncing ? "Syncing…" : "Sync items"}
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setIsCreating(true);
              }}
              className="rounded bg-[#C8773A] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#b5692e]"
            >
              + Add item
            </button>
          </div>
        )}
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 space-y-5 rounded-lg border border-[#3E2F26]/8 bg-white p-6 shadow-sm"
        >
          <h2 className="text-sm font-semibold text-[#3E2F26]">
            {isCreating ? "Create product" : "Edit product"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/50">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded border border-[#3E2F26]/10 bg-[#FAF3E8] px-4 py-3 text-sm text-[#3E2F26] transition-colors focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/50">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded border border-[#3E2F26]/10 bg-[#FAF3E8] px-4 py-3 text-sm text-[#3E2F26] transition-colors focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/50">
                Price (₹)
              </label>
              <input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full rounded border border-[#3E2F26]/10 bg-[#FAF3E8] px-4 py-3 text-sm text-[#3E2F26] transition-colors focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/50">
                Unit
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="200g, pot, bowl…"
                className="w-full rounded border border-[#3E2F26]/10 bg-[#FAF3E8] px-4 py-3 text-sm text-[#3E2F26] transition-colors focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/50">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                placeholder="Chena, Fried, Dessert…"
                className="w-full rounded border border-[#3E2F26]/10 bg-[#FAF3E8] px-4 py-3 text-sm text-[#3E2F26] transition-colors focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/50">
                Sort order
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full rounded border border-[#3E2F26]/10 bg-[#FAF3E8] px-4 py-3 text-sm text-[#3E2F26] transition-colors focus:border-[#C8773A] focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[#3E2F26]">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-[#3E2F26]/30 text-[#C8773A] focus:ring-[#C8773A]"
                />
                Active (visible on site)
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[#3E2F26]">
                <input
                  type="checkbox"
                  checked={isSignature}
                  onChange={(e) => setIsSignature(e.target.checked)}
                  className="rounded border-[#3E2F26]/30 text-[#C8773A] focus:ring-[#C8773A]"
                />
                Signature
              </label>
            </div>
          </div>
          <ImageUploader onUploadSuccess={setUploadedImage} defaultImage={currentImage || undefined} />
          <div className="flex justify-end gap-3 border-t border-[#3E2F26]/8 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-[#3E2F26]/40 transition-colors hover:text-[#3E2F26]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !name.trim() || !category.trim()}
              className="rounded bg-[#C8773A] px-4 py-2 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-[#b5692e] disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      )}

      {!isFormOpen && (
        <div className="overflow-hidden rounded-lg border border-[#3E2F26]/8 bg-white shadow-sm">
          {data?.length === 0 ? (
            <div className="p-4 sm:p-6">
              <AdminEmptyState
                icon={UtensilsCrossed}
                title="No menu products yet"
                description="Seed from the backend script or add items here to populate the menu page."
              >
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsCreating(true);
                  }}
                  className="rounded-lg bg-[#C8773A] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#b5692e]"
                >
                  + Add item
                </button>
              </AdminEmptyState>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-[#3E2F26]/8">
                    <th className="px-4 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/40 sm:px-6">
                      Image
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/40 sm:px-6">
                      Name
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/40 sm:px-6">
                      Category
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/40 sm:px-6">
                      ₹
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/40 sm:px-6">
                      Flags
                    </th>
                    <th className="px-4 py-3.5 text-right text-[10px] font-semibold uppercase tracking-widest text-[#3E2F26]/40 sm:px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3E2F26]/5">
                  {data?.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-[#FAF3E8]/50">
                      <td className="px-4 py-4 sm:px-6">
                        {item.imageUrl ? (
                          <div className="relative h-12 w-12 overflow-hidden rounded">
                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded border border-[#3E2F26]/10 bg-[#FAF3E8]" />
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-[#3E2F26] sm:px-6">
                        {item.name}
                        <p className="mt-0.5 line-clamp-1 text-xs font-normal text-[#3E2F26]/45">
                          {item.description}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-xs text-[#3E2F26]/70 sm:px-6">{item.category}</td>
                      <td className="px-4 py-4 text-sm tabular-nums text-[#3E2F26] sm:px-6">{item.price}</td>
                      <td className="px-4 py-4 text-[10px] uppercase tracking-wide text-[#3E2F26]/50 sm:px-6">
                        {!item.isActive && <span className="mr-1 text-red-500">off</span>}
                        {item.isSignature && <span className="text-[#9B6E2C]">sig</span>}
                      </td>
                      <td className="space-x-3 px-4 py-4 text-right sm:space-x-4 sm:px-6">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="text-[11px] font-semibold text-[#C8773A] transition-opacity hover:opacity-70"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="text-[11px] font-semibold text-red-400 transition-opacity hover:opacity-70"
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
      )}
    </div>
  );
}
