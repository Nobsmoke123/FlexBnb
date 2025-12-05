import authOptions from "./authOptions";
import { getServerSession } from "next-auth";

export const getUserSession = async (): Promise<{
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string | null;
} | null> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return session.user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
