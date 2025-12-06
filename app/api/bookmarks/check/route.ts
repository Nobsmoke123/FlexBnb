import connectDB from "@/config/database";
import UserModel from "@/models/User";
import { getUserSession } from "../../auth/[...nextauth]/getUserSession";

export const POST = async (request: Request) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id: userId } = userSession;

    const [{ propertyId }, user] = await Promise.all([
      request.json() as Promise<{ propertyId: string }>,
      UserModel.findOne({ _id: userId }),
    ]);

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const status = user.bookmarks
      .map((bookmark) => bookmark.toString())
      .includes(propertyId);

    return Response.json(status, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
