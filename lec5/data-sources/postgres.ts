import { AppDataSource } from "../data-source";

export const connectPostgresql = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Connected to PostgreSQL");
  } catch (err) {
    console.error("❌ Failed to connect to PostgreSQL:", err);
    process.exit(1);
  }
};
