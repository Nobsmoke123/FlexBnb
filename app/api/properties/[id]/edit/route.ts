import connectDB from "@/config/database";
import PropertyModel from "@/models/Property";
import { getUserSession } from "@/app/api/auth/[...nextauth]/getUserSession";

export const PUT = async (
  request: Request,
  ctx: RouteContext<`/api/properties/[id]/edit`>
) => {
  try {
    await connectDB();
    const userSession = await getUserSession();
    const { id: propertyId } = (await ctx.params) as { id: string };

    if (!userSession) {
      return new Response("Unauthorized Request", { status: 401 });
    }

    const userId = userSession.id!;

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");

    const propertyData = {
      owner: userId,
      name: formData.get("name")!,
      type: formData.get("type")!,
      description: formData.get("description")!,
      location: {
        street: formData.get("location.street")!,
        city: formData.get("location.city")!,
        state: formData.get("location.state")!,
        zipcode: formData.get("location.zipcode")!,
      },
      beds: formData.get("beds")!,
      baths: formData.get("baths")!,
      square_feet: formData.get("square_feet")!,
      amenities: amenities,
      rates: {
        weekly: formData.get("rates.weekly")!,
        monthly: formData.get("rates.monthly")!,
        nightly: formData.get("rates.nightly")!,
      },
      seller_info: {
        name: formData.get("seller_info.name")!,
        email: formData.get("seller_info.email")!,
        phone: formData.get("seller_info.phone")!,
      },
    };

    const property = await PropertyModel.findOne({
      _id: propertyId.toString(),
    });

    if (!property) {
      return new Response("Property not found.", { status: 404 });
    }

    if (property.owner.toString() !== userId.toString()) {
      return new Response("Unauthorized Action", { status: 403 });
    }

    const updatedProperty = await PropertyModel.findOneAndUpdate(
      {
        _id: propertyId.toString(),
      },
      propertyData,
      {
        new: true,
      }
    );

    return new Response(JSON.stringify(updatedProperty), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
