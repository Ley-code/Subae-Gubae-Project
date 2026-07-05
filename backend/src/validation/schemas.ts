import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(2, "ሙሉ ስም ያስፈልጋል"),
  dateOfBirth: z.string().optional().or(z.literal("")),
  gender: z.string().optional().or(z.literal("")),
  phone: z.string().min(9, "ትክክለኛ ስልክ ቁጥር ያስፈልጋል"),
  email: z.string().email("ትክክለኛ ኢሜይል ያስፈልጋል").optional().or(z.literal("")),
  guardianName: z.string().optional().or(z.literal("")),
  guardianPhone: z.string().optional().or(z.literal("")),
  classGrade: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});
export type RegistrationInput = z.infer<typeof registrationSchema>;

export const newsSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  coverImage: z.string().optional().or(z.literal("")),
  published: z.boolean().default(false),
});
export type NewsInput = z.infer<typeof newsSchema>;

export const eventSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().optional().or(z.literal("")),
  startsAt: z.string().min(1),
  endsAt: z.string().optional().or(z.literal("")),
  coverImage: z.string().optional().or(z.literal("")),
  published: z.boolean().default(false),
});
export type EventInput = z.infer<typeof eventSchema>;

export const articleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  coverImage: z.string().optional().or(z.literal("")),
  category: z.string().optional().or(z.literal("")),
  published: z.boolean().default(false),
});
export type ArticleInput = z.infer<typeof articleSchema>;

export const hymnSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  lyrics: z.string().min(1),
  audioUrl: z.string().optional().or(z.literal("")),
  category: z.string().optional().or(z.literal("")),
});
export type HymnInput = z.infer<typeof hymnSchema>;

export const galleryItemSchema = z.object({
  title: z.string().optional().or(z.literal("")),
  mediaType: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  url: z.string().min(1),
  thumbnailUrl: z.string().optional().or(z.literal("")),
  category: z.string().optional().or(z.literal("")),
});
export type GalleryItemInput = z.infer<typeof galleryItemSchema>;

export const materialSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().or(z.literal("")),
  classGrade: z.string().min(1),
  fileType: z.enum(["PDF", "DOC", "AUDIO", "VIDEO", "OTHER"]),
  fileUrl: z.string().min(1),
  fileSizeKb: z.number().optional(),
});
export type MaterialInput = z.infer<typeof materialSchema>;

export const donationIntentSchema = z.object({
  donorName: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  amount: z.number().positive().optional(),
  purpose: z.string().optional().or(z.literal("")),
});
export type DonationIntentInput = z.infer<typeof donationIntentSchema>;

export const forumThreadSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});
export type ForumThreadInput = z.infer<typeof forumThreadSchema>;
