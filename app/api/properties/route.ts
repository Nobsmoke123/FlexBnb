import connectDB from "@/config/database";
import PropertyModel from "@/models/Property";
import { getUserSession } from "@/app/api/auth/[...nextauth]/getUserSession";
import { uploadImage } from "@/app/utils/upload";
import { CloudinaryImageUploadResponse } from "@/app/types/CloudinaryImage";

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

    const userSession = await getUserSession();

    if (!userSession) {
      return new Response("Unauthorized Request", { status: 401 });
    }

    const userId = userSession.id!;

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
      images: [] as string[],
    };

    // Upload image(s) to Cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      imageUploadPromises.push(uploadImage(image));
    }

    const uploadedImages: CloudinaryImageUploadResponse[] = await Promise.all(
      imageUploadPromises
    );

    propertyData.images = uploadedImages.map((image) => image.url);

    const property = new PropertyModel(propertyData);

    const result = await property.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${result._id}?toast=Property added successfully`
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
