import Hero from "@/components/celebration/Hero";
import Occasions from "@/components/celebration/Occasions";
import Process from "@/components/celebration/Process";
import EnquiryForm from "@/components/celebration/EnquiryForm";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#FAF5F0] overflow-x-hidden">
      <Hero />
      <Occasions />
      <Process />
      <EnquiryForm />
    </main>
  );
}
