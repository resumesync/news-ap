import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Facebook, Twitter, Instagram } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { PwaInstallPrompt } from "./pwa-install-prompt";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const socials = [
    { href: settings.facebookUrl, Icon: Facebook, label: "Facebook" },
    { href: settings.xUrl, Icon: Twitter, label: "X" },
    { href: settings.instagramUrl, Icon: Instagram, label: "Instagram" },
  ].filter((s) => Boolean(s.href));

  return (
    <header className="w-full border-b border-rule bg-background/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Editorial Dateline Bar (Desktop) */}
      <div className="border-b border-rule/60 text-[11px] font-sans text-muted-foreground hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between py-1.5">
          <div className="flex items-center gap-3">
            <span className="font-medium tracking-wide uppercase">{today}</span>
            <span className="text-rule">•</span>
            <span className="tracking-wide">Independent Digital Edition</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="p-1 hover:text-brand transition-colors text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
            <span className="text-rule">•</span>
            <Link
              to="/admin"
              className="hover:text-brand transition-colors font-medium text-[11px]"
            >
              Newsroom
            </Link>
          </div>
        </div>
      </div>

      {/* Main Masthead Container */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          {/* Logo & Wordmark */}
          <Link to="/" className="group flex items-center gap-3.5 select-none">
            {settings.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt={settings.siteName}
                className="h-9 sm:h-11 w-auto"
              />
            ) : (
              <span className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center bg-foreground text-background font-display text-2xl sm:text-3xl font-black rounded-xs shadow-xs group-hover:bg-brand transition-colors duration-200">
                8
              </span>
            )}
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[-0.03em] uppercase text-foreground leading-none">
                {settings.siteName}
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] text-muted-foreground uppercase font-medium mt-1">
                {settings.tagline || "Independent Digital Journalism"}
              </span>
            </div>
          </Link>

          {/* Desktop Minimal Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold font-sans">
            <PwaInstallPrompt />
            <Link
              to="/"
              className="text-foreground hover:text-brand transition-colors py-1 border-b-2 border-transparent hover:border-brand"
            >
              Daily Edition
            </Link>
            <Link
              to="/admin"
              className="text-muted-foreground hover:text-brand transition-colors py-1"
            >
              Editorial Desk
            </Link>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <PwaInstallPrompt />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-sm border border-rule text-foreground hover:bg-secondary transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="mt-4 pt-4 border-t border-rule animate-in fade-in slide-in-from-top-2 duration-200 md:hidden">
            <p className="text-xs text-muted-foreground font-medium mb-3 uppercase tracking-wider">
              {today}
            </p>
            <nav className="flex flex-col gap-2.5 font-sans font-medium text-sm">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-foreground hover:text-brand"
              >
                Today's News Feed
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-muted-foreground hover:text-brand"
              >
                Newsroom Login
              </Link>
            </nav>
            <div className="mt-4 pt-3 border-t border-rule/60 flex items-center gap-4 text-muted-foreground">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="hover:text-brand transition-colors p-1"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Characteristic Crimson Rule Bar */}
      <div className="h-[3px] w-full bg-brand" />
    </header>
  );
}
