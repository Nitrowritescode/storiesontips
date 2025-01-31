import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/create-story(.*)',
  '/buy-credits(.*)',
  '/view-story(.*)',
  '/explore(.*)'
]);

export default clerkMiddleware(async (auth, req) => {

  if (isProtectedRoute(req)) {
    try {
      await auth.protect();
    } catch (error:any) {
      // If user is authenticated but unauthorized, Clerk returns a 404 error
      // Redirect them to the sign-in page instead
      if (error.status === 404) {
        return Response.redirect(new URL('/sign-in', req.nextUrl.origin));
      }
      throw error; // Re-throw other errors
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes 
    '/(api|trpc)(.*)',
  ],
};
