import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg"; // Bạn cần cài đặt: npm install pg

console.log("DEBUG: DATABASE_URL is:", process.env.DATABASE_URL);

// Tạo một Pool kết nối và bắt buộc bật SSL cho AWS RDS
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Bỏ qua xác thực chứng chỉ
  },
  connectionTimeoutMillis: 5000, // Đợi tối đa 5s để tránh EOF do mạng chậm
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };
