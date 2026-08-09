import { z } from "zod";
export const profileSchema = z.object({
  fullName: z.string().min(1).max(100),
  title: z.string().max(100).optional().nullable(),
  titles: z.array(z.string()).optional(),
  shortBio: z.string().max(300).optional().nullable(),
  bio: z.string().optional().nullable(),
  avatarUrl: z.string().url().optional().nullable(),
  heroImageUrl: z.string().url().optional().nullable(),
  cvUrl: z.string().url().optional().nullable(),
  email: z.string().email().optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  location: z.string().max(150).optional().nullable(),
  availability: z.string().max(100).optional().nullable(),
  socialLinks: z.record(z.string(), z.string().url()).optional().nullable(),
  languages: z.unknown().optional().nullable(),
  stats: z.unknown().optional().nullable(),
  callToActions: z.unknown().optional().nullable(),
});
export const settingsSchema = z.object({
  siteName: z.string().min(1).max(120),
  siteDescription: z.string().optional().nullable(),
  logoUrl: z.string().url().optional().nullable(),
  faviconUrl: z.string().url().optional().nullable(),
  primaryColor: z.string().max(20),
  secondaryColor: z.string().max(20),
  theme: z.enum(["light", "dark", "system"]),
  fonts: z.unknown().optional().nullable(),
  heroBackground: z.unknown().optional().nullable(),
  sectionConfig: z.unknown().optional().nullable(),
  seo: z.unknown().optional().nullable(),
  customDomain: z.string().max(255).optional().nullable(),
  language: z.string().max(10),
  direction: z.enum(["ltr", "rtl"]),
  custom: z.unknown().optional().nullable(),
});
export const projectSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().max(255).optional().nullable(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  gallery: z.array(z.string().url()).optional(),
  technologies: z.array(z.string()).default([]),
  demoUrl: z.string().url().optional().nullable(),
  repoUrl: z.string().url().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});
export const skillSchema = z.object({
  name: z.string().min(1).max(50),
  category: z.string().max(50).optional().nullable(),
  proficiencyLevel: z.number().int().min(0).max(100).optional().nullable(),
  iconUrl: z.string().url().optional().nullable(),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});
export const historySchema = z.object({
  type: z.enum(["work", "education", "other"]).optional().nullable(),
  organization: z.string().min(1).max(150),
  positionOrDegree: z.string().max(150).optional().nullable(),
  description: z.string().optional().nullable(),
  location: z.string().max(150).optional().nullable(),
  organizationUrl: z.string().url().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  isCurrent: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});
export const sectionSchema = z.object({
  key: z.string().min(1).max(80),
  title: z.string().min(1).max(150),
  type: z.string().min(1).max(50),
  content: z.unknown(),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});
export const contactSchema = z.object({
  senderName: z.string().min(1).max(100),
  senderEmail: z.string().email().max(255),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(1).max(10000),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
