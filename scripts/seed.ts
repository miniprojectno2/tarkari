import mongoose from "mongoose";
import { readFileSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";
import { EJSON } from "bson";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Import models
import {
  Category,
  Dish,
  User,
  Order,
  Review,
  Favorite,
  Address,
  PaymentMethod,
  Reservation,
  PartyOrder,
  WalletTransaction,
} from "@/models";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI environment variable is not set");
  process.exit(1);
}

interface SeedData {
  categories?: Record<string, unknown>[];
  dishes?: Record<string, unknown>[];
  users?: Record<string, unknown>[];
  orders?: Record<string, unknown>[];
  reviews?: Record<string, unknown>[];
  favorites?: Record<string, unknown>[];
  addresses?: Record<string, unknown>[];
  paymentmethods?: Record<string, unknown>[];
  reservations?: Record<string, unknown>[];
  partyorders?: Record<string, unknown>[];
  wallettransactions?: Record<string, unknown>[];
}

async function loadSeedData(): Promise<SeedData> {
  const seedDir = join(__dirname, "../seed-data");
  const data: SeedData = {};

  const collections = [
    "categories",
    "dishes",
    "users",
    "orders",
    "reviews",
    "favorites",
    "addresses",
    "paymentmethods",
    "reservations",
    "partyorders",
    "wallettransactions",
  ];

  for (const collection of collections) {
    try {
      const filePath = join(seedDir, `${collection}.json`);
      const fileContent = readFileSync(filePath, "utf-8");
      // Parse EJSON format
      data[collection as keyof SeedData] = EJSON.parse(fileContent, { relaxed: false });
      console.log(`✅ Loaded ${collection} data`);
    } catch (error) {
      console.log(`⚠️  Could not load ${collection} data:`, error);
    }
  }

  return data;
}

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...\n");

    // Connect to MongoDB
    console.log(`📡 Connecting to MongoDB...`);
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    const seedData = await loadSeedData();
    console.log();

    // Clear existing data
    console.log("🗑️  Clearing existing collections...");
    await Category.deleteMany({});
    await Dish.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    await Favorite.deleteMany({});
    await Address.deleteMany({});
    await PaymentMethod.deleteMany({});
    await Reservation.deleteMany({});
    await PartyOrder.deleteMany({});
    await WalletTransaction.deleteMany({});
    console.log("✅ Collections cleared\n");

    // Seed categories
    if (seedData.categories && seedData.categories.length > 0) {
      console.log(`📝 Seeding ${seedData.categories.length} categories...`);
      await Category.insertMany(seedData.categories);
      console.log("✅ Categories seeded\n");
    }

    // Seed dishes
    if (seedData.dishes && seedData.dishes.length > 0) {
      console.log(`📝 Seeding ${seedData.dishes.length} dishes...`);
      await Dish.insertMany(seedData.dishes);
      console.log("✅ Dishes seeded\n");
    }

    // Seed users
    if (seedData.users && seedData.users.length > 0) {
      console.log(`📝 Seeding ${seedData.users.length} users...`);
      await User.insertMany(seedData.users);
      console.log("✅ Users seeded\n");
    }

    // Seed orders
    if (seedData.orders && seedData.orders.length > 0) {
      console.log(`📝 Seeding ${seedData.orders.length} orders...`);
      await Order.insertMany(seedData.orders);
      console.log("✅ Orders seeded\n");
    }

    // Seed reviews
    if (seedData.reviews && seedData.reviews.length > 0) {
      console.log(`📝 Seeding ${seedData.reviews.length} reviews...`);
      await Review.insertMany(seedData.reviews);
      console.log("✅ Reviews seeded\n");
    }

    // Seed favorites
    if (seedData.favorites && seedData.favorites.length > 0) {
      console.log(`📝 Seeding ${seedData.favorites.length} favorites...`);
      await Favorite.insertMany(seedData.favorites);
      console.log("✅ Favorites seeded\n");
    }

    // Seed addresses
    if (seedData.addresses && seedData.addresses.length > 0) {
      console.log(`📝 Seeding ${seedData.addresses.length} addresses...`);
      await Address.insertMany(seedData.addresses);
      console.log("✅ Addresses seeded\n");
    }

    // Seed payment methods
    if (seedData.paymentmethods && seedData.paymentmethods.length > 0) {
      console.log(`📝 Seeding ${seedData.paymentmethods.length} payment methods...`);
      await PaymentMethod.insertMany(seedData.paymentmethods);
      console.log("✅ Payment methods seeded\n");
    }

    // Seed reservations
    if (seedData.reservations && seedData.reservations.length > 0) {
      console.log(`📝 Seeding ${seedData.reservations.length} reservations...`);
      await Reservation.insertMany(seedData.reservations);
      console.log("✅ Reservations seeded\n");
    }

    // Seed party orders
    if (seedData.partyorders && seedData.partyorders.length > 0) {
      console.log(`📝 Seeding ${seedData.partyorders.length} party orders...`);
      await PartyOrder.insertMany(seedData.partyorders);
      console.log("✅ Party orders seeded\n");
    }

    // Seed wallet transactions
    if (seedData.wallettransactions && seedData.wallettransactions.length > 0) {
      console.log(`📝 Seeding ${seedData.wallettransactions.length} wallet transactions...`);
      await WalletTransaction.insertMany(seedData.wallettransactions);
      console.log("✅ Wallet transactions seeded\n");
    }

    console.log("✅ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   Categories: ${seedData.categories?.length || 0}`);
    console.log(`   Dishes: ${seedData.dishes?.length || 0}`);
    console.log(`   Users: ${seedData.users?.length || 0}`);
    console.log(`   Orders: ${seedData.orders?.length || 0}`);
    console.log(`   Reviews: ${seedData.reviews?.length || 0}`);
    console.log(`   And more...\n`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// Run seed
seedDatabase();
