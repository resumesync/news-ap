import { Link } from "@tanstack/react-router";
import { useSettings } from "@/hooks/use-settings";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function SiteFooter() {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t-2 border-rule bg-secondary/40 font-sans">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Masthead & About */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center bg-foreground text-background font-display text-lg font-bold rounded-xs">
                8
              </span>
              <span className="font-display text-xl font-bold tracking-tight uppercase text-foreground">
                {settings.siteName}
              </span>
            </div>
            <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-muted-foreground font-serif">
              A sovereign journal of record committed to rigorous reporting, independent investigation, and clear analysis. Built for readers who value depth over sensationalism.
            </p>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 text-xs text-muted-foreground space-y-2">
            <p className="kicker text-[11px] mb-3 text-foreground font-semibold">
              Editorial Offices
            </p>
            {settings.contactAddress && (
              <p className="leading-relaxed">{settings.contactAddress}</p>
            )}
            {settings.contactEmail && (
              <p className="pt-1">
                <span className="font-medium text-foreground">Inquiries:</span>{" "}
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-brand underline underline-offset-2">
                  {settings.contactEmail}
                </a>
              </p>
            )}
            {settings.contactPhone && (
              <p>
                <span className="font-medium text-foreground">Bureau:</span> {settings.contactPhone}
              </p>
            )}
          </div>

          {/* Navigation & Follow */}
          <div className="md:col-span-3 text-xs text-muted-foreground">
            <p className="kicker text-[11px] mb-3 text-foreground font-semibold">
              Connect & Journal
            </p>
            <div className="flex flex-col gap-2">
              <Link to="/" className="hover:text-brand transition-colors">
                Today's Dispatches
              </Link>
              <Link to="/admin" className="hover:text-brand transition-colors font-medium text-foreground">
                Newsroom Login
              </Link>
            </div>

            <div className="mt-4 pt-3 border-t border-rule/60 flex items-center gap-3">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="p-1.5 rounded-sm bg-paper border border-rule hover:text-brand hover:border-brand/40 transition-colors"
                >
                  <Facebook className="h-3.5 w-3.5" />
                </a>
              )}
              {settings.xUrl && (
                <a
                  href={settings.xUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="X"
                  className="p-1.5 rounded-sm bg-paper border border-rule hover:text-brand hover:border-brand/40 transition-colors"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="p-1.5 rounded-sm bg-paper border border-rule hover:text-brand hover:border-brand/40 transition-colors"
                >
                  <Instagram className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright rule */}
        <div className="mt-10 border-t border-rule pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} {settings.siteName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Press Council Standards Compliant</span>
            <span>•</span>
            <Link to="/admin" className="hover:text-brand font-medium">
              Newsroom Staff
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
