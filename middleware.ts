import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Create route matchers for dashboard and admin routes
const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

// Public routes configuration
const publicRoutes = createRouteMatcher(['/api/(.*)']);

export default clerkMiddleware((auth, req) => {
  // Allow public access to specified routes
  if (publicRoutes(req)) {
    return;
  }

  // Restrict admin route to users with a specific role
  if (isAdminRoute(req)) {
    auth().protect({ role: 'org:admin' });
  }

  // Restrict dashboard routes to signed-in users
  if (isDashboardRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
