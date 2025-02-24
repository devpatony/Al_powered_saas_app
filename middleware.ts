import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/',
  '/api/webhooks(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();
  console.log('Auth object:', authObject);
  console.log('Request URL:', req.url);

  if (isProtectedRoute(req) && !authObject.userId) {
    console.log('Protected route accessed without authentication, redirecting to sign-in.');
    return authObject.redirectToSignIn();
  }

  console.log('Request is allowed.');
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
