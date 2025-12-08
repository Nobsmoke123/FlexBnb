import connectDB from "@/config/database";
import MessageModel from "@/models/Messages";
import { getUserSession } from "@/app/api/auth/[...nextauth]/getUserSession";
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

    const [unreadMessages, readMessages] = await Promise.all([
      MessageModel.find({ receiver: userId, read: false })
        .sort({ createdAt: -1 }) // sort in ASC order
        .populate("sender", "name")
        .populate("property", "title"),

      MessageModel.find({
        receiver: userId,
        read: true,
      })
        .sort({ createdAt: -1 }) // sort in ASC order
        .populate("sender", "name")
        .populate("property", "title"),
    ]);

    return Response.json([...unreadMessages, ...readMessages], { status: 200 });
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

    const formData = await(
      request.json() as Promise<{
        name: string;
        email: string;
        phone: string;
        message: string;
        property: string;
        receiver: string;
      }>
    );

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
