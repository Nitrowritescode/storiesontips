import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/create-story(.*)",
  "/buy-credits(.*)",
  "/view-story(.*)",
  "/explore(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const authResult = await auth(); // Await the auth() function
    const { userId } = authResult;

    if (!userId) {
      // User is completely signed out -> Redirect to sign-in
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    try {
      // Protect the route (ensures proper authorization)
      await auth.protect();
    } catch (error) {
      // Authenticated but unauthorized -> Redirect to sign-in
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
