import "dotenv/config";
import path from "node:path";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default("1d"),
  ADMIN_EMAIL: z.string().email().default("admin@example.com"),
  ADMIN_PASSWORD: z.string().min(8).default("change-this-password"),
  ADMIN_NAME: z.string().default("Portfolio Admin"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  CLIENT_ORIGINS: z
    .string()
    .default("http://localhost:5173,http://localhost:3000"),
  UPLOAD_MAX_MB: z.coerce.number().positive().default(5),
});

export const env = envSchema.parse(process.env);
export const clientOrigins = env.CLIENT_ORIGINS.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
export const uploadDir = path.resolve(process.cwd(), "uploads");
