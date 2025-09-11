import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)",
  "/api/webhooks/clerk(.*)"
]);

// Define admin/protected routes that require authentication
const isAdminRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/users(.*)",
  "/settings(.*)",
  "/admin(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth()
    const { pathname, searchParams } = req.nextUrl

    // Webhook routes should bypass authentication entirely
    if (req.nextUrl.pathname.startsWith('/api/webhooks/')) {
        return; // Skip authentication for webhooks
    }

    // If user is not authenticated and trying to access a protected admin route
    if (!userId && isAdminRoute(req)) {
        // Create redirect URL with the original destination
        const redirectUrl = new URL('/sign-in', req.url)
        redirectUrl.searchParams.set('redirect_url', pathname + searchParams.toString())
        
        return Response.redirect(redirectUrl)
    }
    
    if (!userId && !isPublicRoute(req)) {

        return redirectToSignIn();
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}