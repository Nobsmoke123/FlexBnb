import connectDB from "@/config/database";
import PropertyModel from "@/models/Property";
import authOptions from "../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export const GET = async (_request: Request) => {
  try {
    await connectDB();
    const properties = await PropertyModel.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized Request", { status: 401 });
    }

    const userId = session.user.id!;

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    const images = (formData.getAll("images") as File[]).filter(
      (image) => image.name !== ""
    );

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
      images: images,
    };

    console.log("The propertyData is:");
    console.log(propertyData);

    // await connectDB();
    // const property = new PropertyModel({});
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
