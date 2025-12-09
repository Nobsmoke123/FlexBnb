import { NextResponse, NextRequest } from "next/server";
import { getUserSession } from "@/app/api/auth/[...nextauth]/getUserSession";

export async function proxy(request: NextRequest) {
  const session = await getUserSession();

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
