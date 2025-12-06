import connectDB from "@/config/database";
import PropertyModel from "@/models/Property";
import UserModel from "@/models/User";
import { getUserSession } from "../auth/[...nextauth]/getUserSession";

// GET /api/bookmarks
export const GET = async (_request: Request) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id: userId } = userSession;

    const user = await UserModel.findOne({ _id: userId.toString() }).populate(
      "bookmarks"
    );

    if (!user) {
      return new Response("User not found.", { status: 404 });
    }

    return Response.json(user?.bookmarks ?? [], { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};

// POST /api/bookmarks
export const POST = async (request: Request) => {
  try {
    await connectDB();

    const [{ propertyId }, userSession] = await Promise.all([
      request.json() as Promise<{ propertyId: string }>,
      getUserSession(),
    ]);

    if (!userSession?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id: userId } = userSession;

    const [user, property] = await Promise.all([
      UserModel.findOne({ _id: userId.toString() }),
      PropertyModel.findOne({
        _id: propertyId.toString(),
      }),
    ]);

    if (!user) {
      return new Response("User not found.", { status: 404 });
    }

    if (!property) {
      return new Response("Property not found.", { status: 404 });
    }

    const bookmarks = user.bookmarks.includes(property._id)
      ? user.bookmarks.filter(
          (bookmark) => bookmark.toString() !== property._id.toString()
        )
      : [...user.bookmarks, property._id];

    await UserModel.findOneAndUpdate(
      { _id: userId },
      { bookmarks },
      {
        new: true,
      }
    );

    const status = bookmarks.includes(property._id);

    const message = status
      ? "Property bookmarked successfully"
      : "Bookmark removed successfully";

    return Response.json({ status, message }, { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
