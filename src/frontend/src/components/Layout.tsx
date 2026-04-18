import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header
          onMenuToggle={() => setSidebarOpen(true)}
          showMenuButton={isMobile}
        />
        <main className="flex-1 overflow-y-auto bg-background animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
