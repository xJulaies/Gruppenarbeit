import { config } from "dotenv";
import { Tsetting } from "../types/settingsTypes";

config();

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function requireNumberEnv(name: string): number {
  const value = Number(requireEnv(name));

  if (Number.isNaN(value)) {
    throw new Error(`Environment variable ${name} must be a number`);
  }

  return value;
}

export const settings: Tsetting = {
  PORT: requireNumberEnv("PORT"),
  BASE_URL: requireEnv("BASE_URL"),
  MONGODB: requireEnv("MONGODB"),
};
