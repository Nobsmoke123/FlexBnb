import connectDB from "@/config/database";
import PropertyModel from "@/models/Property";

// GET /api/properties/user/:userId
export const GET = async (
  _request: Request,
  ctx: RouteContext<`/api/properties/user/[userId]`>
) => {
  try {
    await connectDB();

    const { userId } = (await ctx.params) as { userId: string };

    if (!userId) {
      return new Response("Unathorized.", { status: 400 });
    }

    const properties = await PropertyModel.find({ owner: userId });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
