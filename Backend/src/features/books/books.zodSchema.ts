import { z } from "zod";

export const createBookSchema = z.object({
  titel: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Titel must not exceed 200 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(2000, "Description must not exceed 2000 characters"),
  author: z
    .string()
    .trim()
    .min(1, "Author is required")
    .max(100, "Author must not exceed 100 characters"),
  published: z
    .string()
    .trim()
    .min(6, "released date is required")
    .max(10, "date must not exceed 10 characters"),
});
