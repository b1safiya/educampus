import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { Bell, GraduationCap, LayoutDashboard, LogOut, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Notices", to: "/notices", icon: Bell },
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
    adminOnly: true,
  },
];

export function Sidebar({ isOpen, onClose, isMobile }: SidebarProps) {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logoutUser();
    navigate({ to: "/login" });
  };

  const visibleItems = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:static lg:translate-x-0",
          isMobile
            ? isOpen
              ? "translate-x-0 animate-slide-in-from-left"
              : "-translate-x-full"
            : "translate-x-0",
        )}
        data-ocid="sidebar"
      >
        {/* Logo */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-display font-bold text-sidebar-foreground tracking-tight">
              EduCampus
            </span>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={onClose}
              aria-label="Close sidebar"
              data-ocid="sidebar.close_button"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto py-4 px-3 space-y-1"
          data-ocid="sidebar.nav"
        >
          {visibleItems.map((item) => {
            const isActive = currentPath.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-subtle"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
                data-ocid={`sidebar.nav_${item.label.toLowerCase()}`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div className="border-t border-sidebar-border p-3">
          {user && (
            <div className="flex items-center gap-3 px-2 py-2 rounded-md mb-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-sidebar-foreground truncate">
                  {user.name}
                </p>
                <Badge
                  variant="secondary"
                  className="mt-0.5 capitalize text-xs h-4 px-1.5"
                  data-ocid="sidebar.role_badge"
                >
                  {user.role}
                </Badge>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
            onClick={handleLogout}
            data-ocid="sidebar.logout_button"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>
    </>
  );
}
