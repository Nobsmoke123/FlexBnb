import connectDB from "@/config/database";
import PropertyModel from "@/models/Property";

export const POST = async (request: Request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = RegExp(location!, "i");

    let query: Record<string, any> = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
      ],
    };

    // Only check for property if its not 'All'
    if (propertyType && propertyType !== "All") {
      query.type = RegExp(propertyType, "i");
    }

    const properties = await PropertyModel.find(query);

    return Response.json(properties, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
