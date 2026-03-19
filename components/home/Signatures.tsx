import ProductCard from "@/components/ui/ProductCard";

const featuredSweets = [
  {
    name: "Gulab Jamun",
    description: "Caramelized khoya spheres infused with cardamom, soaked in a fragrant saffron-scented syrup.",
    price: 20,
    image: "https://images.unsplash.com/photo-1596450514735-a50d40c01061?q=80&w=1200", 
  },
  {
    name: "Roshogolla",
    description: "The pride of Bengal. Spongy, pillowy chenna dumplings in a light, refreshing simple syrup.",
    price: 20,
    image: "https://images.unsplash.com/photo-1624821588643-d3090dc42ef6?q=80&w=1200", 
  },
  {
    name: "Malpua",
    description: "Deep-fried golden pancakes, laced with fennel, dipped in syrup and garnished with pistachios.",
    price: 20,
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1200", 
  },
];

export default function Signatures() {
  return (
    <section className="w-full bg-[var(--background)] py-24 px-8 md:px-12 lg:px-24">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-16">
        <h2 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl text-zinc-900 uppercase tracking-wide">
          THE SIGNATURES
        </h2>
        <span className="font-sans text-foreground font-medium text-lg">
          Featured Collection
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredSweets.map((sweet) => (
          <ProductCard
            key={sweet.name}
            name={sweet.name}
            description={sweet.description}
            price={sweet.price}
            image={sweet.image}
          />
        ))}
      </div>
    </section>
  );
}
