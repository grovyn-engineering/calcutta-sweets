# Calcutta Sweets

Calcutta Sweets is a high-fidelity, premium web application designed for an artisanal Bengali sweet shop. It blends traditional heritage with a sophisticated, motion-driven web experience to showcase authentic recipes and craftsmanship through an Apple-inspired minimal aesthetic.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Server Components)
- **Styling**: [Tailwind CSS 14+](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (High-performance transition system)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## ✨ Key Features

- **High-Fidelity Motion Design**: A unified animation system utilizing custom cubic-bezier easing for smooth, premium transitions across all sections.
- **Dynamic Storytelling**: An interactive timeline and masonry grid system that reveals the three-generation legacy of the brand.
- **Arch-and-Circle Revelations**: Custom architectural image reveals in the Menu section to emphasize brand authenticity.
- **Performance Optimized**: Leveraging React Server Components (RSC) to minimize client-side bundles while maintaining interactive animation layers.
- **Responsive Excellence**: Fully fluid layouts optimized for everything from ultra-wide monitors to mobile devices.

## 📂 Project Structure

```text
├── app/                        # Next.js App Router (Pages & Layouts)
│   ├── celebration/            # Celebration & Events page
│   ├── menu/                   # Digital Menu & Catalog
│   ├── story/                  # Heritage & Brand story
│   ├── visit-us/               # Store location & Contact
│   └── globals.css             # Global styles & Tailwind layers
├── components/                 # Atomic and Modular React components
│   ├── celebration/            # Events & Enquiry components
│   ├── home/                   # Homepage sections (Hero, Signatures, etc.)
│   ├── layout/                 # Global UI (Sticky Navbar, Footer)
│   ├── menu/                   # Menu-specific layers (Authenticity, Catering)
│   ├── story/                  # Storytelling layers (Timeline, Family, Craft)
│   └── ui/                     # Shared Design System primitives
├── lib/                        # Core business logic & Animation tokens
│   ├── animations.ts           # Centralized Framer Motion variants
│   ├── products.ts             # Data layer for signature sweets
│   └── types.ts                # Strict TypeScript interfaces
├── public/                     # High-resolution visual assets
└── store/                      # Global state (Cart, User, Inventory)
```

## 💎 Documentation & Quality Standards

The codebase adheres to a "Senior Developer" standard of documentation and structural clarity:
- **Professional Commentary**: All fragmented or AI-generated labels have been replaced with high-fidelity technical commentary.
- **Architectural Headers**: Major components include JSDoc-style headers detailing their role in the brand narrative and technical requirements.
- **Modular Animations**: Animations are decoupled from components into a centralized library (`lib/animations.ts`) for reusability and maintainability.

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

