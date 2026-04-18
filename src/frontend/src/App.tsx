import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

// Lazy-loaded pages
const LoginPage = lazy(() =>
  import("@/pages/Login").then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import("@/pages/Register").then((m) => ({ default: m.RegisterPage })),
);
const NoticesPage = lazy(() =>
  import("@/pages/Notices").then((m) => ({ default: m.NoticesPage })),
);
const NoticeDetailPage = lazy(() =>
  import("@/pages/NoticeDetail").then((m) => ({ default: m.NoticeDetailPage })),
);
const DashboardPage = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.DashboardPage })),
);

function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

// Index redirect
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/notices" />,
});

// Login
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});

// Register
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RegisterPage />
    </Suspense>
  ),
});

// Notices list
const noticesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notices",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <NoticesPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

// Notice detail
const noticeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notices/$noticeId",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <NoticeDetailPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

// Dashboard (admin only)
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute requiredRole="admin">
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <DashboardPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  noticesRoute,
  noticeDetailRoute,
  dashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      storageKey="educampus-theme"
      enableSystem
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
