import { getAllProducts } from "@/lib/products";
import SignaturesClient from "./SignaturesClient";

export default async function Signatures() {
  const products = await getAllProducts();

  return (
    <section className="w-full bg-[#FEF7F2] py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-24">
      <SignaturesClient products={products} />
    </section>
  );
}