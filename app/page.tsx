import Hero from "@/components/home/Hero";
import OurStory from "@/components/home/OurStory";
import Signatures from "@/components/home/Signatures";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Signatures />
      <OurStory />
      {/* <Testimonials /> */}
    </main>
  );
}
