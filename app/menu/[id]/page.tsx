"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto min-h-screen">
      <Link 
        href="/menu" 
        className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Menu
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-zinc-100 rounded-3xl animate-pulse" />
        <div className="flex flex-col justify-center">
          <h1 className="font-dm-serif text-5xl text-zinc-900 mb-4">
            Product {id}
          </h1>
          <p className="font-sans text-zinc-500 text-lg mb-8">
            Product detail page under construction. This will display the full details for the selected sweet.
          </p>
          <div className="h-12 w-48 bg-foreground/10 rounded-full animate-pulse" />
        </div>
      </div>
    </main>
  );
}
