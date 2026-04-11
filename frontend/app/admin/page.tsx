export default function AdminDashboard() {
  const instructions = [
    {
      id: "01",
      title: "Menu Navigation",
      description: "Use the menu on the left to find the page you want to change. Each button takes you to a different part of your website."
    },
    {
      id: "02",
      title: "Homepage Banner",
      description: "Change the main heading and the big photo at the very top of your website. This is the first thing people see when they open the site."
    },
    {
      id: "03",
      title: "Celebrations",
      description: "Update your special event boxes. You can add, change, or remove items like Diwali specials or wedding collections here."
    },
    {
      id: "04",
      title: "Signature Sweets",
      description: "Showcase your best-selling items. Add photos and descriptions for your famous sweets and traditional recipes."
    },
    {
      id: "05",
      title: "Our Story",
      description: "Share your shop's history and values. You can update the text and image that tells the story of your brand's journey."
    },
    {
      id: "06",
      title: "Wedding Stats",
      description: "Show your wedding experience. Update the numbers and stats that show how many successful weddings you've served."
    },
    {
      id: "07",
      title: "Special Orders",
      description: "Manage custom and bulk orders. Update the text and banner that explains how customers can place special requests."
    },
    {
      id: "08",
      title: "Visit Us",
      description: "Keep your contact details correct. Update your shop address, phone number, and email so customers can find you easily."
    }
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold text-[#3E2F26] mb-1">Dashboard Overview</h1>
      <p className="text-sm text-[#3E2F26]/50 italic mb-8">"Update your shop's website content effortlessly."</p>

      <div className="bg-white border border-[#3E2F26]/8 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#3E2F26]/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#FAF3E8] flex items-center justify-center text-[#C8773A]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#3E2F26]">Administrator&apos;s Instruction Guide</h2>
        </div>

        {/* Content */}
        <div className="p-8 space-y-10">
          {instructions.map((item) => (
            <div key={item.id} className="flex gap-8 group">
              <div className="text-3xl font-bold text-[#C8773A]/20 tracking-tighter shrink-0 transition-colors group-hover:text-[#C8773A]/40">
                {item.id}
              </div>
              <div className="space-y-1.5 pt-1.5">
                <h3 className="text-base font-bold text-[#3E2F26] tracking-tight">{item.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#3E2F26]/60">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Quote */}
        <div className="px-8 py-10 text-center border-t border-[#3E2F26]/5 bg-[#FAF3E8]/30">
          <p className="text-xs text-[#3E2F26]/30 italic tracking-wide">
            &quot;Tradition is not the worship of ashes, but the preservation of fire.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
