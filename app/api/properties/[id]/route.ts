import connectDB from "@/config/database";
import PropertyModel from "@/models/Property";
import { getUserSession } from "../../auth/[...nextauth]/getUserSession";

// GET /api/properties/:id
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

// DELETE /api/properties/:id
export const DELETE = async (
  _request: Request,
  ctx: RouteContext<`/api/properties/[id]`>
) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const { id: propertyId } = (await ctx.params) as { id: string };
    const { id: userId } = userSession;

    const property = await PropertyModel.findOne({
      _id: propertyId.toString(),
    });

    if (!property) {
      return new Response(
        JSON.stringify({
          message: "Property not found",
          status: 404,
        }),
        { status: 404 }
      );
    }

    if (property.owner.toString() === userId?.toString()) {
      await PropertyModel.findOneAndDelete({
        _id: propertyId.toString(),
        owner: userSession?.id!.toString(),
      });

      return new Response(JSON.stringify(property), { status: 200 });
    } else {
      return new Response("Unauthorized", { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
