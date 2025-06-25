import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  console.log("Starting to seed the database...");

  // Create test users with different roles
  const password = await hashPassword("Password123!");

  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@persmon.com" },
    update: {},
    create: {
      email: "admin@persmon.com",
      password,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
    },
  });
  console.log("Created admin user:", admin.email);

  // HR user
  const hr = await prisma.user.upsert({
    where: { email: "hr@persmon.com" },
    update: {},
    create: {
      email: "hr@persmon.com",
      password,
      firstName: "HR",
      lastName: "Manager",
      role: "HR",
    },
  });
  console.log("Created HR user:", hr.email);

  // CFO user
  const cfo = await prisma.user.upsert({
    where: { email: "cfo@persmon.com" },
    update: {},
    create: {
      email: "cfo@persmon.com",
      password,
      firstName: "Finance",
      lastName: "Officer",
      role: "CFO",
    },
  });
  console.log("Created CFO user:", cfo.email);

  // Regular employee
  const employee = await prisma.user.upsert({
    where: { email: "employee@persmon.com" },
    update: {},
    create: {
      email: "employee@persmon.com",
      password,
      firstName: "Regular",
      lastName: "Employee",
      role: "EMPLOYEE",
    },
  });
  console.log("Created employee user:", employee.email);

  // System admin
  const sysAdmin = await prisma.user.upsert({
    where: { email: "sysadmin@persmon.com" },
    update: {},
    create: {
      email: "sysadmin@persmon.com",
      password,
      firstName: "System",
      lastName: "Administrator",
      role: "SYSTEM_ADMIN",
    },
  });
  console.log("Created system admin user:", sysAdmin.email);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
