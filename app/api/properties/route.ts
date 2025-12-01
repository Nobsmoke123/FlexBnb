import connectDB from "@/config/database";
import PropertyModel from "@/models/Property";

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
