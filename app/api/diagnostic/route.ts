import connectToDatabase from "@/lib/mongodb";
import { Dish, Category } from "@/models";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function GET() {
  try {
    await connectToDatabase();

    const dishCount = await Dish.countDocuments();
    const categoryCount = await Category.countDocuments();

    const firstDish = await Dish.findOne().populate("categoryId");
    const firstCategory = await Category.findOne();

    return apiSuccess({
      status: "connected",
      dishCount,
      categoryCount,
      firstDish: {
        name: firstDish?.name,
        categoryId: firstDish?.categoryId,
      },
      firstCategory: {
        name: firstCategory?.name,
        _id: firstCategory?._id,
      },
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Diagnostic error:", error);
    return apiError("SERVER_ERROR", `Diagnostic failed: ${error instanceof Error ? error.message : String(error)}`, 500);
  }
}
