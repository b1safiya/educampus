import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { Bell, ChevronDown, LogOut, Menu, User } from "lucide-react";
import { toast } from "sonner";

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuToggle, showMenuButton }: HeaderProps) {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate({ to: "/login" });
  };

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center gap-3 bg-card border-b border-border px-4 shadow-subtle"
      data-ocid="header"
    >
      {showMenuButton && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 lg:hidden"
          onClick={onMenuToggle}
          aria-label="Open menu"
          data-ocid="header.menu_toggle"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className="flex-1">
        <span className="font-display font-semibold text-foreground tracking-tight hidden sm:block">
          EduCampus
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative"
          aria-label="Notifications"
          data-ocid="header.notifications_button"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>

        <ThemeToggle />

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-9 px-3"
                data-ocid="header.user_menu"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:flex flex-col items-start min-w-0">
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {user.name}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="hidden md:flex capitalize text-xs h-5"
                  data-ocid="header.role_badge"
                >
                  {user.role}
                </Badge>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => toast.info("Profile settings coming soon")}
                data-ocid="header.profile_item"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={handleLogout}
                data-ocid="header.logout_item"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
