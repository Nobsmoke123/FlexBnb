import connectDB from "@/config/database";
import UserModel from "@/models/User";
import { Account, Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    // invoke on successful sign in
    async signin({
      account: _,
      profile,
    }: {
      account: Account;
      profile: Profile;
    }) {
      // Connect to database
      await connectDB();

      // Check if the user logging exists
      const userExists = await UserModel.findOne({ email: profile.email });

      // If not add the user to the database
      if (!userExists) {
        // Truncate username if too long.

        const user = new UserModel({
          email: profile.email!,
          image: profile.image!,
          username: profile.name!.slice(0, 30)!,
        });

        await user.save();
      }

      // return true to allow signin
      return true;
    },
    // Modifies the session object
    async session({ session }: { session: Session }) {
      if (session.user) {
        // Get the user from the database
        const user = await UserModel.findOne({ email: session.user?.email! });

        session.user = { ...session?.user!, id: user?._id.toString() };
        // assign the userId to the session
        // return the session
      }
      return session;
    },
  },
};

export default authOptions;
