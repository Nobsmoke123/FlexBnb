import connectDB from "@/config/database";
import MessageModel from "@/models/Messages";
import { getUserSession } from "../auth/[...nextauth]/getUserSession";
import PropertyModel from "@/models/Property";

// GET /api/messages
export const GET = async (_request: Request) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession?.id) {
      return Response.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id: userId } = userSession;

    const messages = await MessageModel.find({ receiver: userId })
      .populate("sender", "name")
      .populate("property", "title");

    return Response.json(messages, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
};

// POST /api/messages
export const POST = async (request: Request) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession?.id) {
      return Response.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id: userId } = userSession;

    const formData = await request.json();

    const property = await PropertyModel.findOne({ _id: formData.property });

    if (!property) {
      return Response.json({ message: "Property not found." }, { status: 404 });
    }

    if (property.owner.toString() !== formData.receiver.toString()) {
      return Response.json({ message: "Unauthorized action" }, { status: 403 });
    }

    const messageData = {
      sender: userId,
      ...formData,
    };

    const message = new MessageModel({ ...messageData });

    await message.save();

    return Response.json(message, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
};
