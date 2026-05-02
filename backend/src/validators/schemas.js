const { z } = require('zod');

// --- Auth ---
const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

// --- Hero Section ---
const heroSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  subtitle: z.string().trim().min(1, "Subtitle is required"),
  imageUrl: z.string().optional(),
  cloudinaryPublicId: z.string().optional(),
});

const heroUpdateSchema = heroSchema.partial();

// --- Occasion ---
const occasionCreateSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  imageUrl: z.string().optional(),
  cloudinaryPublicId: z.string().optional(),
  iconKey: z.string().trim().optional().default("Heart"),
  sortOrder: z.coerce.number().int().optional(),
});

const occasionUpdateSchema = occasionCreateSchema.partial();

// --- Signature Sweet ---
const signatureSweetCreateSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  subTitle: z.string().trim().optional().default(""),
  imageUrl: z.string().optional(),
  cloudinaryPublicId: z.string().optional(),
});

const signatureSweetUpdateSchema = signatureSweetCreateSchema.partial();

// --- Wedding Stat ---
const weddingStatSchema = z.object({
  label: z.string().trim().min(1, "Label is required"),
  value: z.string().trim().min(1, "Value is required"),
});

const weddingStatUpdateSchema = weddingStatSchema.partial();

// --- Contact Info ---
const contactInfoSchema = z.object({
  address: z.string().trim().min(1, "Address is required"),
  phone: z.string().trim().min(1, "Phone is required"),
  email: z.string().email("Valid email is required"),
  description: z.string().trim().optional().default(""),
  hours: z.string().trim().optional().nullable(),
  visitHeroImageUrl: z.string().optional().nullable(),
  visitHeroPublicId: z.string().optional().nullable(),
  visitHeroEyebrow: z.string().optional().nullable(),
  visitHeroTitle: z.string().optional().nullable(),
  visitHeroDescription: z.string().optional().nullable(),
  visitDirectionsUrl: z.string().optional().nullable(),
  visitFeaturesHeading: z.string().optional().nullable(),
  visitFeaturesSubtitle: z.string().optional().nullable(),
  visitWelcomeHeading: z.string().optional().nullable(),
  visitWelcomeBody: z.string().optional().nullable(),
  visitOwnerName: z.string().optional().nullable(),
  visitOwnerRole: z.string().optional().nullable(),
  visitOwnerImageUrl: z.string().optional().nullable(),
  visitOwnerPublicId: z.string().optional().nullable(),
  visitWelcomeLocationLine: z.string().optional().nullable(),
  visitWelcomeHoursLine: z.string().optional().nullable(),
  socialLinks: z
    .array(
      z.object({
        platform: z.string().trim().min(1, 'Platform is required'),
        url: z.string().trim().min(1, 'URL is required'),
      })
    )
    .optional(),
});

// --- Visit Us page feature cards ---
const visitUsFeatureCreateSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional().default(""),
  imageUrl: z.string().optional().nullable(),
  cloudinaryPublicId: z.string().optional().nullable(),
  sortOrder: z.coerce.number().int().optional(),
});

const visitUsFeatureUpdateSchema = visitUsFeatureCreateSchema.partial();

// --- Story ---
const craftStepSchema = z.object({
  icon: z.string().optional().default(""),
  title: z.string(),
  description: z.string(),
});
const familyMemberSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
});
const storySchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().min(1, "Content is required"),
  imageUrl: z.string().optional(),
  cloudinaryPublicId: z.string().optional(),
  heroEyebrow: z.string().optional().nullable(),
  craftOverline: z.string().optional().nullable(),
  craftHeadline: z.string().optional().nullable(),
  craftImageUrl: z.string().optional().nullable(),
  craftPublicId: z.string().optional().nullable(),
  craftSteps: z.array(craftStepSchema).optional(),
  timelineTitle: z.string().optional().nullable(),
  timelineSubtitle: z.string().optional().nullable(),
  familySectionTitle: z.string().optional().nullable(),
  familyMembers: z.array(familyMemberSchema).optional(),
  quoteText: z.string().optional().nullable(),
  quoteAttribution: z.string().optional().nullable(),
});

// --- Special Order ---
const specialOrderSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  cloudinaryPublicId: z.string().optional(),
});

// --- Testimonials ---
const testimonialCreateSchema = z.object({
  quote: z.string().trim().min(1, "Quote is required"),
  name: z.string().trim().min(1, "Name is required"),
  title: z.string().trim().min(1, "Title is required"),
  sortOrder: z.number().int().optional(),
});

const testimonialUpdateSchema = testimonialCreateSchema.partial();

// --- Visit Us page stats (heritage strip) ---
const visitUsStatCreateSchema = z.object({
  value: z.string().trim().min(1, "Value is required"),
  label: z.string().trim().min(1, "Label is required"),
  sortOrder: z.number().int().optional(),
});

const visitUsStatUpdateSchema = visitUsStatCreateSchema.partial();

// --- Celebration process steps ---
const celebrationProcessCreateSchema = z.object({
  stepNumber: z.string().trim().min(1, "Step number is required"),
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  iconKey: z.string().trim().min(1, "Icon key is required"),
  sortOrder: z.number().int().optional(),
});

const celebrationProcessUpdateSchema = celebrationProcessCreateSchema.partial();

// --- Menu products (storefront menu) ---
const menuProductCreateSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().optional().default(""),
  price: z.coerce.number().int().min(0),
  unit: z.string().trim().optional().default("200g"),
  category: z.string().trim().min(1, "Category is required"),
  imageUrl: z.string().optional(),
  cloudinaryPublicId: z.string().optional(),
  inventoryProductId: z.string().uuid().optional().nullable(),
  sortOrder: z.coerce.number().int().optional(),
  isActive: z.coerce.boolean().optional(),
  isSignature: z.coerce.boolean().optional(),
});

const menuProductUpdateSchema = menuProductCreateSchema.partial();

// --- Celebration page hero (singleton) ---
const celebrationHeroUpdateSchema = z.object({
  eyebrow: z.string().trim().optional(),
  title: z.string().trim().optional(),
  subtitle: z.string().trim().optional(),
  mainImageUrl: z.string().optional().nullable(),
  mainPublicId: z.string().optional().nullable(),
  secondaryLeftUrl: z.string().optional().nullable(),
  secondaryLeftPublicId: z.string().optional().nullable(),
  secondaryRightUrl: z.string().optional().nullable(),
  secondaryRightPublicId: z.string().optional().nullable(),
});

module.exports = {
  loginSchema,
  heroSchema,
  heroUpdateSchema,
  occasionCreateSchema,
  occasionUpdateSchema,
  signatureSweetCreateSchema,
  signatureSweetUpdateSchema,
  weddingStatSchema,
  weddingStatUpdateSchema,
  contactInfoSchema,
  storySchema,
  specialOrderSchema,
  testimonialCreateSchema,
  testimonialUpdateSchema,
  visitUsStatCreateSchema,
  visitUsStatUpdateSchema,
  celebrationProcessCreateSchema,
  celebrationProcessUpdateSchema,
  menuProductCreateSchema,
  menuProductUpdateSchema,
  visitUsFeatureCreateSchema,
  visitUsFeatureUpdateSchema,
  celebrationHeroUpdateSchema,
};
