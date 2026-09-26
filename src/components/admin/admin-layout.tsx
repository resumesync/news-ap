import { useState, useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Newspaper,
  Megaphone,
  BarChart3,
  Settings,
  ExternalLink,
  LogOut,
  PlusCircle,
  Menu,
  X,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import { isAdminAuthenticated, setAdminAuthenticated } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function AdminLayout({
  children,
  title,
  description,
  action,
}: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());
  const [passcode, setPasscode] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Allow demo instant login or password "admin" / "eight"
    setAdminAuthenticated(true);
    setIsAuthenticated(true);
    toast.success("Welcome back to EIGHT NEWS Editorial Desk");
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    toast.info("Signed out of Newsroom");
  };

  // If not logged in, show a dedicated premium mock login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] text-neutral-100 flex items-center justify-center p-4 selection:bg-brand selection:text-white">
        <div className="w-full max-w-md bg-[#1a1a1a] border border-neutral-800 rounded-sm p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-grid h-12 w-12 place-items-center bg-brand text-white font-display text-2xl font-bold rounded-xs mb-3">
              8
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white uppercase">
              EIGHT NEWS
            </h1>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1 font-sans">
              Editorial Desk & Content Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-access-key"
                className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5"
              >
                Access Key / Staff ID
              </label>
              <div className="relative">
                <input
                  id="admin-access-key"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter staff key or click instant access"
                  className="w-full bg-[#121212] border border-neutral-700 rounded-xs px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand"
                />
                <KeyRound className="absolute right-3 top-3 h-4 w-4 text-neutral-500" />
              </div>
              <p className="mt-1.5 text-[11px] text-neutral-400">
                Front-end demonstration mode: No backend credentials required.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand/90 text-white font-sans font-semibold py-2.5 px-4 rounded-xs text-sm transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" />
              Sign in to Newsroom
            </button>

            <button
              type="button"
              onClick={() => handleLogin()}
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-sans font-medium py-2 px-4 rounded-xs text-xs transition-colors cursor-pointer border border-neutral-700"
            >
              1-Click Demo Access
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
            <Link
              to="/"
              className="text-xs text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              ← Return to Public Newspaper
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "News Articles", href: "/admin/news", icon: Newspaper },
    { label: "Write Article", href: "/admin/news/new", icon: PlusCircle },
    { label: "Advertisements", href: "/admin/ads", icon: Megaphone },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-foreground flex flex-col md:flex-row font-sans">
      {/* Mobile Top Bar */}
      <header className="md:hidden bg-[#18181b] text-white px-4 py-3 flex items-center justify-between border-b border-neutral-800 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center bg-brand text-white font-display text-sm font-bold rounded-xs">
            8
          </span>
          <span className="font-display font-bold text-base tracking-tight uppercase">
            EIGHT NEWS
          </span>
          <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded-xs uppercase tracking-wider font-semibold">
            Admin
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-sm bg-neutral-800 text-neutral-200"
          aria-label="Toggle admin navigation"
        >
          {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={cn(
          "w-64 bg-[#141416] text-neutral-200 shrink-0 flex flex-col justify-between border-r border-neutral-800 z-40 transition-transform duration-200",
          "md:translate-x-0 md:static md:min-h-screen",
          mobileSidebarOpen
            ? "fixed inset-y-0 left-0 translate-x-0 shadow-2xl"
            : "fixed inset-y-0 left-0 -translate-x-full md:translate-x-0",
        )}
      >
        <div>
          {/* Logo / Masthead Header */}
          <div className="p-5 border-b border-neutral-800/80">
            <Link to="/admin" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center bg-brand text-white font-display text-lg font-bold rounded-xs shadow-xs">
                8
              </span>
              <div>
                <span className="font-display text-lg font-bold tracking-tight uppercase text-white block leading-none">
                  EIGHT NEWS
                </span>
                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-semibold block mt-1">
                  Newsroom Desk
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? currentPath === "/admin"
                  : currentPath.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs font-semibold tracking-wide uppercase transition-colors",
                    isActive
                      ? "bg-brand text-white shadow-xs font-bold"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/60",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Actions */}
        <div className="p-3 border-t border-neutral-800/80 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800/60 rounded-xs transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] text-neutral-500 uppercase">Public</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-xs transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar for Desktop */}
        <header className="bg-white border-b border-rule/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {title || "Newsroom Desk"}
            </h1>
            {description && (
              <p className="text-xs text-muted-foreground font-sans mt-0.5">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {action}
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-rule text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>View Site</span>
            </Link>
          </div>
        </header>

        {/* Inner Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
