import connectDB from "@/config/database";
import PropertyModel from "@/models/Property";

export const GET = async (
  _request: Request,
  ctx: RouteContext<`/api/properties/[id]`>
) => {
  try {
    await connectDB();

    const { id } = (await ctx.params) as { id: string };

    const property = await PropertyModel.findOne({ _id: id.toString() });

    if (!property)
      return new Response(
        JSON.stringify({
          message: "Property not found",
          status: 404,
        }),
        { status: 404 }
      );

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
