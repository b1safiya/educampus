import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Loader2, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function RegisterPage() {
  const { updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const profile = {
        principal: `reg-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role,
        createdAt: BigInt(Date.now()),
      };
      updateUserProfile(profile);
      toast.success("Account created! Welcome to EduCampus.");
      navigate({ to: role === "admin" ? "/dashboard" : "/notices" });
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
          <div className="text-center space-y-2">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground mx-auto shadow-elevated">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
              Join EduCampus
            </h1>
            <p className="text-muted-foreground text-sm">
              Create your campus account
            </p>
          </div>

          <Card className="shadow-elevated" data-ocid="register.card">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg">
                Create account
              </CardTitle>
              <CardDescription>
                Fill in your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-9"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      data-ocid="register.name_input"
                    />
                  </div>
                  {errors.name && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="register.name_field_error"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="reg-email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="you@university.edu"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-ocid="register.email_input"
                    />
                  </div>
                  {errors.email && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="register.email_field_error"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <RadioGroup
                    value={role}
                    onValueChange={(v) => setRole(v as UserRole)}
                    className="flex gap-4"
                    data-ocid="register.role_select"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="student"
                        id="r-student"
                        data-ocid="register.role_student"
                      />
                      <Label htmlFor="r-student" className="cursor-pointer">
                        Student
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="admin"
                        id="r-admin"
                        data-ocid="register.role_admin"
                      />
                      <Label htmlFor="r-admin" className="cursor-pointer">
                        Admin
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitting}
                  data-ocid="register.submit_button"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Create account
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
              data-ocid="register.login_link"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
