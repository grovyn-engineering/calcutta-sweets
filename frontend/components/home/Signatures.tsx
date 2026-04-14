import { fetchFromBackend } from "@/lib/serverFetch";
import SignaturesClient from "./SignaturesClient";

const FALLBACK_SIGNATURES = [
  {
    id: "1",
    name: "Royal Rasmalai",
    description: "Soft chenna patties immersed in thickened, sweetened saffron infused milk.",
    imageUrl: "/images/sweet.jpg",
  },
  {
    id: "2",
    name: "Spongy Roshogolla",
    description: "The pride of Bengal. Soft, spongy cheese balls soaked in light sugary syrup.",
    imageUrl: "/images/sweet2.jpg",
  },
  {
    id: "3",
    name: "Golden Gulab Jamun",
    description: "Deep fried dumplings made of milk solids, dipped in rose scented sugar syrup.",
    imageUrl: "/images/sweet3.jpg",
  }
];

function mapSignature(sweet: any) {
  // If the fallback data is returned directly by our fetch wrapper, it's already mapped
  if (sweet.name) return sweet; 

  return {
    id: sweet.id ?? crypto.randomUUID(),
    name: sweet.title ?? "Untitled Sweet",
    description: sweet.subTitle ?? "",
    imageUrl: sweet.imageUrl ?? "/images/sweet.jpg",
  };
}

async function getSignatures() {
  const data = await fetchFromBackend<any[]>("/signature-sweets", {
    fallback: FALLBACK_SIGNATURES,
  });

  return data.map(mapSignature);
}

export default async function Signatures() {
  const products = await getSignatures();

  return (
    <section className="w-full bg-[#FEF7F2] py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-24">
      <SignaturesClient products={products as any} />
    </section>
  );
}