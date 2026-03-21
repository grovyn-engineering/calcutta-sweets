import { Suspense } from "react";
import MenuPage from "@/components/menu/Products";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading menu...</div>}>
      <MenuPage />
    </Suspense>
  );
}
