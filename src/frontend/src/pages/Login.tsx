import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function LoginPage() {
  const { loginWithII, isLoading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // Demo login for quick access
  const handleDemoLogin = async (role: "admin" | "student") => {
    setSubmitting(true);
    try {
      const demoProfile = {
        principal: `demo-${role}-${Date.now()}`,
        name: role === "admin" ? "Dr. Admin User" : "Student Jane",
        email:
          role === "admin" ? "admin@university.edu" : "jane@university.edu",
        role,
        createdAt: BigInt(Date.now()),
      };
      updateUserProfile(demoProfile);
      toast.success(`Signed in as ${demoProfile.name}`);
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
      toast.error("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm space-y-6 animate-fade-in">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground mx-auto shadow-elevated">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
              EduCampus
            </h1>
            <p className="text-muted-foreground text-sm">
              Smart Notice Board — sign in to continue
            </p>
          </div>

          <Card
            className="shadow-elevated border-border"
            data-ocid="login.card"
          >
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg">
                Welcome back
              </CardTitle>
              <CardDescription>
                Sign in with Internet Identity to access the campus notice board
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Internet Identity */}
              <Button
                className="w-full"
                onClick={handleIILogin}
                disabled={submitting || isLoading}
                data-ocid="login.ii_button"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Sign in with Internet Identity
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    or try a demo
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDemoLogin("admin")}
                  disabled={submitting}
                  data-ocid="login.demo_admin_button"
                >
                  Admin Demo
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDemoLogin("student")}
                  disabled={submitting}
                  data-ocid="login.demo_student_button"
                >
                  Student Demo
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
              data-ocid="login.register_link"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
