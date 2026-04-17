import Link from "next/link";

export default function Categories() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Milk Sweets', 'Dry Fruits', 'Gifting', 'Snacks'].map((category) => (
            <Link 
              key={category} 
              href={`/menu`}
              className="bg-white h-40 flex items-center justify-center rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition"
            >
              <span className="font-semibold">{category}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
