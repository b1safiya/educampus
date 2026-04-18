import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, T as ThemeToggle, G as GraduationCap, B as Button, L as Link, b as ue } from "./index-CTWTDStn.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-DRgiFb1C.js";
import { L as LoaderCircle } from "./loader-circle-DkAjpYhq.js";
function LoginPage() {
  const { loginWithII, isLoading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = reactExports.useState(false);
  const handleDemoLogin = async (role) => {
    setSubmitting(true);
    try {
      const demoProfile = {
        principal: `demo-${role}-${Date.now()}`,
        name: role === "admin" ? "Dr. Admin User" : "Student Jane",
        email: role === "admin" ? "admin@university.edu" : "jane@university.edu",
        role,
        createdAt: BigInt(Date.now())
      };
      updateUserProfile(demoProfile);
      ue.success(`Signed in as ${demoProfile.name}`);
      navigate({ to: role === "admin" ? "/dashboard" : "/notices" });
    } finally {
      setSubmitting(false);
    }
  };
  const handleIILogin = async () => {
    setSubmitting(true);
    try {
      await loginWithII();
      navigate({ to: "/notices" });
    } catch {
      ue.error("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-4 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-6 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground mx-auto shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground tracking-tight", children: "EduCampus" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Smart Notice Board — sign in to continue" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "shadow-elevated border-border",
          "data-ocid": "login.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Welcome back" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Sign in with Internet Identity to access the campus notice board" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "w-full",
                  onClick: handleIILogin,
                  disabled: submitting || isLoading,
                  "data-ocid": "login.ii_button",
                  children: [
                    submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
                    "Sign in with Internet Identity"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full border-t border-border" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-2 text-muted-foreground", children: "or try a demo" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "secondary",
                    size: "sm",
                    onClick: () => handleDemoLogin("admin"),
                    disabled: submitting,
                    "data-ocid": "login.demo_admin_button",
                    children: "Admin Demo"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "secondary",
                    size: "sm",
                    onClick: () => handleDemoLogin("student"),
                    disabled: submitting,
                    "data-ocid": "login.demo_student_button",
                    children: "Student Demo"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/register",
            className: "text-primary hover:underline font-medium",
            "data-ocid": "login.register_link",
            children: "Create account"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  LoginPage
};
