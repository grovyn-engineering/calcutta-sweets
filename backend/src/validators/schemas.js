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
});

// --- Story ---
const storySchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().min(1, "Content is required"),
  imageUrl: z.string().optional(),
  cloudinaryPublicId: z.string().optional(),
});

// --- Special Order ---
const specialOrderSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  cloudinaryPublicId: z.string().optional(),
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
};
