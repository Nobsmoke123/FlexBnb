import { ExtendedProfile } from "@/app/types/GoogleProfile";
import connectDB from "@/config/database";
import UserModel from "@/models/User";
import { Account, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
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
    async signIn({
      user: _,
      account: __,
      profile,
    }: {
      user: User | AdapterUser;
      account: Account | null;
      profile?: ExtendedProfile;
    }) {
      await connectDB();

      const userExists = await UserModel.findOne({ email: profile?.email });

      if (!userExists) {
        const user = new UserModel({
          email: profile?.email!,
          image: profile?.picture!,
          username: profile?.name!.slice(0, 30)!,
        });

        await user.save();
      }

      return true;
    },
    // Modifies the session object
    async session({ session }: { session: Session }) {
      if (session.user) {
        const user = await UserModel.findOne({ email: session.user?.email! });
        session.user = { ...session?.user!, id: user?._id.toString() };
      }
      return session;
    },
  },
};

export default authOptions;
