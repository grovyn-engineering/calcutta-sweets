# Calcutta Sweets

Calcutta Sweets is a premium web application designed for an artisanal Bengali sweet shop. It blends traditional heritage with a modern, high-performance web experience to showcase authentic recipes and craftsmanship.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## ✨ Key Features

- **Artisanal Hero Section**: A dynamic, high-impact carousel showcasing signature sweets with smooth transitions.
- **Our Story**: A dedicated section highlighting the three-generation legacy and the brand's roots in Tatibandh.
- **Categorized Menu**: Browse through various categories of sweets like Sondesh, Roshogulla, and Malpua.
- **Responsive Design**: Fully optimized for a seamless experience across mobile, tablet, and desktop devices.
- **Interactive UI**: Micro-animations and smooth scroll effects for a premium look and feel.

## 📂 Project Structure

```text
├── app/                        # Next.js App Router (Pages & Layouts)
│   ├── celebration/            # Celebration & Events page
│   │   └── page.tsx
│   ├── menu/                   # Digital Menu & Catalog
│   │   ├── [id]/               # Dynamic product detail page
│   │   └── page.tsx
│   ├── story/                  # Heritage & Brand story
│   │   └── page.tsx
│   ├── visit-us/               # Store location & Contact
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css             # Global styles & Tailwind layers
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/                 # Reusable React components
│   ├── celebration/            # Events & Enquiry components
│   │   ├── EnquiryForm.tsx
│   │   ├── Hero.tsx
│   │   ├── Occasions.tsx
│   │   └── Process.tsx
│   ├── home/                   # Homepage specific sections
│   │   ├── Categories.tsx
│   │   ├── Hero.tsx
│   │   ├── OurStory.tsx
│   │   ├── Signatures.tsx
│   │   └── Testimonials.tsx
│   ├── layout/                 # Shared Layout components
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── menu/                   # Menu & Product listing components
│   │   ├── Authenticity.tsx
│   │   ├── CateringCTA.tsx
│   │   ├── Products.tsx
│   │   └── SpecialOffers.tsx
│   ├── story/                  # Storytelling components
│   │   ├── ArtOfCraft.tsx
│   │   ├── Family.tsx
│   │   ├── GiftCTA.tsx
│   │   ├── Quote.tsx
│   │   ├── StoryPage.tsx
│   │   └── Timeline.tsx
│   ├── ui/                     # Shared UI primitives (Buttons, Cards)
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── ProductCard.tsx
│   │   └── TestimonialCard.tsx
│   └── visit-us/               # Location & Contact components
│       ├── FindUs.tsx
│       ├── Hero.tsx
│       ├── StoreStats.tsx
│       └── WelcomeSection.tsx
├── lib/                        # Business logic & Utility functions
│   ├── products.ts             # Product data management
│   └── types.ts                # Shared TypeScript models
├── public/                     # Static assets (Images, Fonts, Models)
├── store/                      # Global state management (Zustand)
│   ├── authStore.ts            # User authentication state
│   ├── cartStore.ts            # Shopping cart logic
│   ├── inventoryStore.ts       # Product inventory state
│   └── uiStateStore.ts         # General UI/Modal state
├── three/                      # Interactive 3D Rendering components
│   ├── Lights.tsx              # Scene lighting
│   ├── RasmalaiModel.tsx       # 3D Food models
│   └── Scene.tsx               # Main 3D Canvas
├── types/                      # Global Type definitions
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies & scripts
├── tailwind.config.ts          # Styles configuration
└── tsconfig.json               # TypeScript configuration
```

## 🛠️ Getting Started

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 License

Created for Calcutta Sweets. All rights reserved.
