import connectDB from "@/config/database";
import MessageModel from "@/models/Messages";
import { getUserSession } from "@/app/api/auth/[...nextauth]/getUserSession";

// GET /api/messages/unread
export const GET = async (_request: Request) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession?.id) {
      return Response.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id: userId } = userSession;

    const unread = await MessageModel.countDocuments({
      receiver: userId,
      read: false,
    });

    return Response.json(unread, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
};
