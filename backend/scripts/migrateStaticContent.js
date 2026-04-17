const { PrismaClient } = require('@prisma/client');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

const HERO_SLIDES = [
  {
    title: 'Sondesh',
    subtitle: 'Assorted Sondesh – traditional Bengali milk sweets',
    imageUrl: '/images/hero/sondesh.png',
  },
  {
    title: 'Malpua',
    subtitle: 'Golden brown Malpua dessert',
    imageUrl: '/images/hero/malpua.png',
  },
  {
    title: 'Roshogulla',
    subtitle: 'Spongy Roshogulla in sugar syrup',
    imageUrl: '/images/hero/roshogulla.png',
  },
  {
    title: 'Chamcham',
    subtitle: 'Delicious Chamcham sweets',
    imageUrl: '/images/hero/chamcham.png',
  },
];

const CONTACT_PAGE_EXTRAS = {
  visitHeroImageUrl: '/images/Shop.png',
  visitHeroEyebrow: 'TATIBANDH, RAIPUR',
  visitHeroTitle: 'Come Find Us.',
  visitHeroDescription:
    'Come experience the smell of fresh cardamom and the taste of sweets made by hand. We have been part of the Tatibandh neighborhood since 2000, and we are proud to keep the tradition alive.',
  visitDirectionsUrl: 'https://maps.google.com/?q=Calcutta+Sweets+Tatibandh+Raipur',
  visitFeaturesHeading: 'Experience Authenticity',
  visitFeaturesSubtitle:
    'Our store is more than a shop; it is an invitation to witness the heritage of Bengal. Breathe in the aroma of fresh cardamom and watch our karigars at work.',
  visitWelcomeHeading: "We'd Love to\nWelcome You.",
  visitWelcomeBody:
    'Whether you are grabbing a box of Sandesh for a party or just dropping by for a morning Rosogolla, we are always here. We have been serving Raipur since 2000, and our doors are always open.',
  visitOwnerName: 'Aloke Bera',
  visitOwnerRole: 'Owner, Calcutta Sweets',
  visitOwnerImageUrl: '/images/chef3.jpg',
  visitWelcomeLocationLine: 'Tatibandh Square, Raipur',
  visitWelcomeHoursLine: '9:00 AM – 10:00 PM',
};

const CONTACT_DEFAULTS = {
  address: 'Main Road, Tatibandh, \nRaipur, Chhattisgarh 492099',
  phone: '+91 99930 60082',
  email: process.env.PUBLIC_CONTACT_EMAIL || 'hello@calcuttasweets.com',
  description: 'Flagship store — Tatibandh, Raipur',
  hours: '9 AM – 10 PM | Monday – Sunday',
  ...CONTACT_PAGE_EXTRAS,
};

const SIGNATURE_SWEETS_SEED = [
  {
    title: 'Royal Rasmalai',
    subTitle:
      'Soft chenna patties immersed in thickened, sweetened saffron infused milk.',
    imageUrl: '/images/sweet.jpg',
  },
  {
    title: 'Spongy Roshogolla',
    subTitle: 'The pride of Bengal. Soft, spongy cheese balls soaked in light sugary syrup.',
    imageUrl: '/images/sweet2.jpg',
  },
  {
    title: 'Golden Gulab Jamun',
    subTitle:
      'Deep fried dumplings made of milk solids, dipped in rose scented sugar syrup.',
    imageUrl: '/images/sweet3.jpg',
  },
  {
    title: 'Bengali Malpua',
    subTitle:
      'Traditional sweet pancakes, fried until golden and soaked in cardamom sugar syrup.',
    imageUrl: '/images/sweet4.jpg',
  },
  {
    title: 'Mishti Doi',
    subTitle:
      'Thick, creamy fermented sweet yogurt served in traditional clay pots.',
    imageUrl: '/images/sweet5.jpg',
  },
];

const OCCASIONS_SEED = [
  { title: 'Weddings', imageUrl: '/images/wedding.png', iconKey: 'Heart', sortOrder: 0 },
  { title: 'Birthdays', imageUrl: '/images/birthday.png', iconKey: 'Cake', sortOrder: 1 },
  { title: 'Durga Puja', imageUrl: '/images/puja.png', iconKey: 'Landmark', sortOrder: 2 },
  { title: 'Diwali', imageUrl: '/images/diwali.png', iconKey: 'Flame', sortOrder: 3 },
  { title: 'Corporate', imageUrl: '/images/corporate.png', iconKey: 'Briefcase', sortOrder: 4 },
];

const VISIT_US_FEATURES_SEED = [
  {
    title: 'The Golden Display',
    description:
      'An array of fresh Sandesh and Roshogolla, curated daily to perfection.',
    imageUrl: '/images/sweet2.jpg',
    sortOrder: 0,
  },
  {
    title: 'Artisanal Craft',
    description:
      'Every sweet is a masterpiece of texture and balance, crafted by experts.',
    imageUrl: '/images/sweet3.jpg',
    sortOrder: 1,
  },
  {
    title: 'Refined Atmosphere',
    description:
      'A serene space designed for the connoisseur who appreciates fine traditional taste.',
    imageUrl: '/images/shopInterior.png',
    sortOrder: 2,
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Every bite feels like a trip to Kolkata. The balance of sweetness is perfect, just like how my Didun used to make it.',
    name: 'Priya Sharma',
    title: 'RAIPUR RESIDENT',
    sortOrder: 0,
  },
  {
    quote:
      'Been coming here since childhood. The Malpua is consistent in taste even after 15 years. Truly Raipur\'s finest treasure.',
    name: 'Rahul Agarwal',
    title: 'LOYAL CUSTOMER',
    sortOrder: 1,
  },
  {
    quote:
      'The Mishti Doi alone is worth the trip from Durg. Authentic ingredients and that earthen pot aroma is unbeatable.',
    name: 'Ananya Sen',
    title: 'FOOD BLOGGER',
    sortOrder: 2,
  },
];

const VISIT_US_STATS = [
  { value: 'Since 2000', label: 'HERITAGE ESTABLISHED', sortOrder: 0 },
  { value: '100% Natural', label: 'NO PRESERVATIVES', sortOrder: 1 },
  { value: 'Loved by Generations', label: 'AUTHENTIC TASTE', sortOrder: 2 },
];

const CELEBRATION_STEPS = [
  {
    stepNumber: '01',
    title: 'Enquire & Select',
    description:
      'Fill the form or call us to share your event details and sweet preferences.',
    iconKey: 'ClipboardEdit',
    sortOrder: 0,
  },
  {
    stepNumber: '02',
    title: 'Customize',
    description: 'Choose flavors, packaging styles, and personalized branding options.',
    iconKey: 'Palette',
    sortOrder: 1,
  },
  {
    stepNumber: '03',
    title: 'Freshly Prepared',
    description:
      'Our Karigars craft your order 6 hours prior to delivery for maximum freshness.',
    iconKey: 'CookingPot',
    sortOrder: 2,
  },
  {
    stepNumber: '04',
    title: 'Timely Delivery',
    description:
      'Carefully packed and shipped to your venue via our temperature-controlled fleet.',
    iconKey: 'Truck',
    sortOrder: 3,
  },
];

const STORY_PAGE_DEFAULT = {
  title: 'A Recipe\nOlder\nThan Raipur',
  content:
    'Making the perfect Mishti takes time and a lot of practice. It is about knowing exactly when the milk is ready. This is a skill passed down through three generations of our family.',
  imageUrl: '/images/sweet8.jpg',
  publicId: '',
  heroEyebrow: 'CALCUTTA SWEETS',
  craftOverline: 'How We Make It',
  craftHeadline: 'The Art of Hand Kneaded\nPerfection',
  craftImageUrl: '/images/ingredients.png',
  craftPublicId: '',
  craftSteps: [
    {
      icon: '🌅',
      title: 'The Morning Curd',
      description:
        'Every morning, we get fresh full cream milk and split it by hand to make our own Chenna. It is the only way to get the texture just right.',
    },
    {
      icon: '🤲',
      title: 'The Rhythmic Knead',
      description:
        'Our makers shape every sweet by hand. You just cannot get that same soft delicate texture with a machine.',
    },
    {
      icon: '🍃',
      title: 'The Gentle Poach',
      description:
        'We cook each batch in hot syrup or oil until it is perfectly light. It is all about timing it right to get that signature melt in your mouth feel.',
    },
  ],
  timelineTitle: 'Our Journey Through Time',
  timelineSubtitle:
    'Tracing our steps from a humble sweet shop to a nationwide celebration of original Bengali craftsmanship.',
  familySectionTitle: 'Three Generations, One\nFamily.',
  familyMembers: [
    {
      name: 'CHEF 1',
      title: 'THE MATRIARCH',
      description:
        'She kept the original family recipes and always insisted that the quality of the milk is what makes a sweet truly special.',
      image: '/images/chef1.jpg',
    },
    {
      name: 'CHEF 2',
      title: 'THE ARCHITECT',
      description:
        'He helped us grow while keeping our traditional roots, bringing better kitchen standards to our family old school methods.',
      image: '/images/chef2.jpg',
    },
    {
      name: 'Aloke Bera',
      title: 'THE CURATOR',
      description:
        'He is making sure our family legacy carries on, focusing on the same high quality while sharing our story with a new generation.',
      image: '/images/chef3.jpg',
    },
  ],
  quoteText:
    'We never scaled to grow faster; we only scaled to bring the authentic flavor of North Calcutta to a neighborhood that deserved it. In every bite, there is a piece of our childhood home.',
  quoteAttribution: 'THE FOUNDING FAMILY',
};

const MENU_PRODUCTS = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567801',
    name: 'Royal Rasmalai',
    description:
      'Soft chenna patties immersed in thickened, sweetened saffron infused milk with pistachios.',
    price: 280,
    unit: '200g',
    category: 'Chena',
    imageUrl: '/images/sweet.jpg',
    publicId: null,
    sortOrder: 0,
    isActive: true,
    isSignature: true,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567802',
    name: 'Spongy Roshogolla',
    description:
      'The pride of Bengal. Soft, spongy cheese balls soaked in a clear, light sugary syrup.',
    price: 200,
    unit: '200g',
    category: 'Chena',
    imageUrl: '/images/sweet2.jpg',
    publicId: null,
    sortOrder: 1,
    isActive: true,
    isSignature: true,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567803',
    name: 'Golden Gulab Jamun',
    description:
      'Deep fried dumplings made of milk solids, dipped in rose scented sugar syrup.',
    price: 180,
    unit: '200g',
    category: 'Fried',
    imageUrl: '/images/sweet3.jpg',
    publicId: null,
    sortOrder: 2,
    isActive: true,
    isSignature: true,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567804',
    name: 'Bengali Malpua',
    description:
      'Traditional sweet pancakes, fried until golden and soaked in cardamom sugar syrup.',
    price: 150,
    unit: '200g',
    category: 'Fried',
    imageUrl: '/images/sweet4.jpg',
    publicId: null,
    sortOrder: 3,
    isActive: true,
    isSignature: true,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567805',
    name: 'Mishti Doi',
    description:
      'Thick, creamy fermented sweet yogurt served in traditional clay pots.',
    price: 120,
    unit: 'pot',
    category: 'Dessert',
    imageUrl: '/images/sweet5.jpg',
    publicId: null,
    sortOrder: 4,
    isActive: true,
    isSignature: true,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567806',
    name: 'Classic Sandesh',
    description:
      'Delicate, melt in your mouth milk fudge made from fresh chenna and aromatic cardamom.',
    price: 250,
    unit: '200g',
    category: 'Chena',
    imageUrl: '/images/sweet6.jpg',
    publicId: null,
    sortOrder: 5,
    isActive: true,
    isSignature: false,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567807',
    name: 'Patishapta Crepe',
    description:
      'Thin rice flour crepes filled with sweetened coconut and kheer, a winter delicacy.',
    price: 200,
    unit: '200g',
    category: 'Baked',
    imageUrl: '/images/sweet7.jpg',
    publicId: null,
    sortOrder: 6,
    isActive: true,
    isSignature: false,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567808',
    name: 'Nolen Gurer Payesh',
    description:
      'Aromatic rice pudding cooked with date palm jaggery, a quintessential Bengali winter treat.',
    price: 180,
    unit: 'bowl',
    category: 'Dessert',
    imageUrl: '/images/sweet8.jpg',
    publicId: null,
    sortOrder: 7,
    isActive: true,
    isSignature: false,
  },
];

const TIMELINE_EVENTS = [
  {
    year: '1947',
    title: 'The Humble Threshold',
    description:
      'Our family started with a tiny wooden shop in North Calcutta, where we sold just three kinds of traditional sweets.',
  },
  {
    year: '1978',
    title: 'The Pehla Revolution',
    description:
      'We launched our winter Nolen Gur sweets and they quickly became a favorite across the city.',
  },
  {
    year: '2005',
    title: 'Legacy Modernised',
    description:
      'We moved to Raipur and opened our flagship store, still using the same traditional techniques we started with decades ago.',
  },
  {
    year: 'Today',
    title: 'A Taste of Heritage',
    description:
      'We are still making everything by hand, sharing the sweets we love with a whole new generation.',
  },
];

async function seedStory(force) {
  const existing = await prisma.story.findFirst();
  if (existing && !force) {
    console.log('Story page: skipped (already present; use --force to replace)');
    return;
  }
  if (existing && force) {
    await prisma.story.update({
      where: { id: existing.id },
      data: STORY_PAGE_DEFAULT,
    });
    console.log('Story page: updated with defaults (--force)');
    return;
  }
  await prisma.story.create({ data: STORY_PAGE_DEFAULT });
  console.log('Story page: seeded');
}

async function seedTimelineEvents(force) {
  if (force) await prisma.timelineEvent.deleteMany({});
  const n = await prisma.timelineEvent.count();
  if (n > 0) {
    console.log('Timeline events: skipped (already present; use --force to replace)');
    return;
  }
  await prisma.timelineEvent.createMany({ data: TIMELINE_EVENTS });
  console.log(`Timeline events: seeded ${TIMELINE_EVENTS.length}`);
}

async function seedHero(force) {
  if (force) await prisma.heroSection.deleteMany({});
  const n = await prisma.heroSection.count();
  if (n > 0) {
    console.log('Hero slides: skipped (already present; use --force to replace)');
    return;
  }
  await prisma.heroSection.createMany({
    data: HERO_SLIDES.map((h) => ({
      title: h.title,
      subtitle: h.subtitle,
      imageUrl: h.imageUrl,
    })),
  });
  console.log(`Hero slides: seeded ${HERO_SLIDES.length} items`);
}

async function seedContact(force) {
  const existing = await prisma.contactInfo.findFirst();
  if (!existing) {
    await prisma.contactInfo.create({ data: { ...CONTACT_DEFAULTS } });
    console.log('Contact info: created defaults');
    return;
  }
  if (force) {
    await prisma.contactInfo.update({
      where: { id: existing.id },
      data: {
        address: CONTACT_DEFAULTS.address,
        phone: CONTACT_DEFAULTS.phone,
        email: CONTACT_DEFAULTS.email,
        description: CONTACT_DEFAULTS.description,
        hours: CONTACT_DEFAULTS.hours,
        ...CONTACT_PAGE_EXTRAS,
      },
    });
    console.log('Contact info: updated with defaults (--force)');
  } else if (!existing.hours) {
    await prisma.contactInfo.update({
      where: { id: existing.id },
      data: { hours: CONTACT_DEFAULTS.hours },
    });
    console.log('Contact info: filled missing hours');
  } else {
    console.log('Contact info: skipped');
  }
}

async function patchContactVisitPageIfEmpty() {
  const row = await prisma.contactInfo.findFirst();
  if (!row) return;
  const patch = {};
  if (!row.visitHeroImageUrl?.trim()) patch.visitHeroImageUrl = CONTACT_PAGE_EXTRAS.visitHeroImageUrl;
  if (!row.visitHeroEyebrow?.trim()) patch.visitHeroEyebrow = CONTACT_PAGE_EXTRAS.visitHeroEyebrow;
  if (!row.visitHeroTitle?.trim()) patch.visitHeroTitle = CONTACT_PAGE_EXTRAS.visitHeroTitle;
  if (!row.visitHeroDescription?.trim()) {
    patch.visitHeroDescription = CONTACT_PAGE_EXTRAS.visitHeroDescription;
  }
  if (!row.visitDirectionsUrl?.trim()) {
    patch.visitDirectionsUrl = CONTACT_PAGE_EXTRAS.visitDirectionsUrl;
  }
  if (!row.visitFeaturesHeading?.trim()) {
    patch.visitFeaturesHeading = CONTACT_PAGE_EXTRAS.visitFeaturesHeading;
  }
  if (!row.visitFeaturesSubtitle?.trim()) {
    patch.visitFeaturesSubtitle = CONTACT_PAGE_EXTRAS.visitFeaturesSubtitle;
  }
  if (!row.visitWelcomeHeading?.trim()) {
    patch.visitWelcomeHeading = CONTACT_PAGE_EXTRAS.visitWelcomeHeading;
  }
  if (!row.visitWelcomeBody?.trim()) {
    patch.visitWelcomeBody = CONTACT_PAGE_EXTRAS.visitWelcomeBody;
  }
  if (!row.visitOwnerName?.trim()) patch.visitOwnerName = CONTACT_PAGE_EXTRAS.visitOwnerName;
  if (!row.visitOwnerRole?.trim()) patch.visitOwnerRole = CONTACT_PAGE_EXTRAS.visitOwnerRole;
  if (!row.visitOwnerImageUrl?.trim()) {
    patch.visitOwnerImageUrl = CONTACT_PAGE_EXTRAS.visitOwnerImageUrl;
  }
  if (!row.visitWelcomeLocationLine?.trim()) {
    patch.visitWelcomeLocationLine = CONTACT_PAGE_EXTRAS.visitWelcomeLocationLine;
  }
  if (!row.visitWelcomeHoursLine?.trim()) {
    patch.visitWelcomeHoursLine = CONTACT_PAGE_EXTRAS.visitWelcomeHoursLine;
  }
  if (Object.keys(patch).length === 0) return;
  await prisma.contactInfo.update({ where: { id: row.id }, data: patch });
  console.log('Contact: filled missing visit page CMS fields');
}

async function seedVisitUsFeatures(force) {
  if (force) await prisma.visitUsFeature.deleteMany({});
  const n = await prisma.visitUsFeature.count();
  if (n > 0 && !force) {
    console.log('Visit us features: skipped (already present; use --force to replace)');
    return;
  }
  await prisma.visitUsFeature.createMany({ data: VISIT_US_FEATURES_SEED });
  console.log(`Visit us features: seeded ${VISIT_US_FEATURES_SEED.length}`);
}

async function seedSignatureSweets(force) {
  if (force) await prisma.signatureSweet.deleteMany({});
  const n = await prisma.signatureSweet.count();
  if (n > 0 && !force) {
    console.log('Signature sweets: skipped (already present; use --force to replace)');
    return;
  }
  await prisma.signatureSweet.createMany({ data: SIGNATURE_SWEETS_SEED });
  console.log(`Signature sweets: seeded ${SIGNATURE_SWEETS_SEED.length}`);
}

async function seedOccasions(force) {
  if (force) await prisma.occasion.deleteMany({});
  const n = await prisma.occasion.count();
  if (n > 0 && !force) {
    console.log('Celebrations (occasions): skipped (already present; use --force to replace)');
    return;
  }
  await prisma.occasion.createMany({ data: OCCASIONS_SEED });
  console.log(`Celebrations (occasions): seeded ${OCCASIONS_SEED.length}`);
}

async function seedTestimonials(force) {
  if (force) await prisma.testimonial.deleteMany({});
  const n = await prisma.testimonial.count();
  if (n > 0) {
    console.log('Testimonials: skipped (already present; use --force to replace)');
    return;
  }
  await prisma.testimonial.createMany({ data: TESTIMONIALS });
  console.log(`Testimonials: seeded ${TESTIMONIALS.length}`);
}

async function seedVisitUsStats(force) {
  if (force) await prisma.visitUsStat.deleteMany({});
  const n = await prisma.visitUsStat.count();
  if (n > 0) {
    console.log('Visit us stats: skipped (already present; use --force to replace)');
    return;
  }
  await prisma.visitUsStat.createMany({ data: VISIT_US_STATS });
  console.log(`Visit us stats: seeded ${VISIT_US_STATS.length}`);
}

async function seedCelebrationSteps(force) {
  if (force) await prisma.celebrationProcessStep.deleteMany({});
  const n = await prisma.celebrationProcessStep.count();
  if (n > 0) {
    console.log('Celebration process: skipped (already present; use --force to replace)');
    return;
  }
  await prisma.celebrationProcessStep.createMany({ data: CELEBRATION_STEPS });
  console.log(`Celebration process: seeded ${CELEBRATION_STEPS.length}`);
}

async function seedMenuProducts(force) {
  if (force) await prisma.menuProduct.deleteMany({});
  const n = await prisma.menuProduct.count();
  if (n > 0 && !force) {
    console.log('Menu products: skipped (already present; use --force to replace)');
    return;
  }
  await prisma.menuProduct.createMany({ data: MENU_PRODUCTS });
  console.log(`Menu products: seeded ${MENU_PRODUCTS.length}`);
}

async function patchStoryQuoteIfEmpty() {
  const story = await prisma.story.findFirst();
  if (!story) return;
  const q = story.quoteText && String(story.quoteText).trim();
  const a = story.quoteAttribution && String(story.quoteAttribution).trim();
  if (q && a) return;
  await prisma.story.update({
    where: { id: story.id },
    data: {
      quoteText: q || STORY_PAGE_DEFAULT.quoteText,
      quoteAttribution: a || STORY_PAGE_DEFAULT.quoteAttribution,
    },
  });
  console.log('Story: filled missing closing quote fields');
}

async function main() {
  const force = process.argv.includes('--force');
  console.log(force ? 'Mode: --force (replacing listed content)\n' : 'Mode: safe (empty tables only)\n');

  await seedHero(force);
  await seedContact(force);
  await patchContactVisitPageIfEmpty();
  await seedVisitUsFeatures(force);
  await seedOccasions(force);
  await seedSignatureSweets(force);
  await seedTestimonials(force);
  await seedVisitUsStats(force);
  await seedCelebrationSteps(force);
  await seedStory(force);
  await seedTimelineEvents(force);
  await seedMenuProducts(force);
  await patchStoryQuoteIfEmpty();

  console.log('\nDone.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
