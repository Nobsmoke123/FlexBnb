import connectDB from "@/config/database";
import MessageModel from "@/models/Messages";
import { getUserSession } from "@/app/api/auth/[...nextauth]/getUserSession";

// PUT /api/messages/:id
export const PUT = async (
  _request: Request,
  ctx: RouteContext<"/api/messages/[id]">
) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession?.id) {
      return Response.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id: userId } = userSession;

    const { id: messageId } = await ctx.params;

    const message = await MessageModel.findOne({ _id: messageId });

    if (!message) {
      return Response.json({ message: "Message not found." }, { status: 404 });
    }

    if (message.receiver.toString() !== userId) {
      return Response.json({ message: "Unauthorized action" }, { status: 403 });
    }

    message.read = !message.read;

    await message.save();
    return Response.json(message.read, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
};

export const DELETE = async (
  _request: Request,
  ctx: RouteContext<"/api/messages/[id]">
) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession?.id) {
      return Response.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id: userId } = userSession;

    const { id: messageId } = await ctx.params;

    const message = await MessageModel.findOne({ _id: messageId });

    if (!message) {
      return Response.json({ message: "Message not found." }, { status: 404 });
    }

    if (message.receiver.toString() !== userId) {
      return Response.json({ message: "Unauthorized action" }, { status: 403 });
    }

    await message.deleteOne();
    return Response.json(message, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
};
