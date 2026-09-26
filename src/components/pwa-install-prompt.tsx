import { useState, useEffect } from "react";
import { Download, Check, Share, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already in standalone PWA mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Listen for beforeinstallprompt on Chromium browsers (Chrome, Edge, Samsung Internet, Brave)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosInstructions(true);
      return;
    }

    if (!deferredPrompt) {
      // If the native prompt is not yet ready, show manual guide
      setShowIosInstructions(true);
      return;
    }

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || dismissed) return null;

  return (
    <>
      {/* Top Header / Bar Install Button */}
      <button
        type="button"
        onClick={handleInstallClick}
        aria-label="EIGHT NEWS యాప్ ఇన్‌స్టాల్ చేసుకోండి"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand text-white font-sans text-[11px] font-bold hover:bg-brand/90 transition-transform active:scale-95 shadow-sm cursor-pointer animate-pulse"
      >
        <Download className="h-3.5 w-3.5 stroke-[2.5]" />
        <span>యాప్ ఇన్‌స్టాల్</span>
      </button>

      {/* iOS or Manual Fallback Instructions Modal */}
      {showIosInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-xl bg-neutral-900 border border-neutral-800 p-5 text-neutral-100 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowIosInstructions(false)}
              className="absolute top-3.5 right-3.5 p-1 rounded-full text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand flex items-center justify-center text-white font-black font-display text-2xl shadow-md">
                8
              </div>
              <div>
                <h3 className="font-bold text-base text-white">EIGHT NEWS App</h3>
                <p className="text-xs text-neutral-400">యాప్‌ను మీ ఫోన్‌లో ఇన్‌స్టాల్ చేయండి</p>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-neutral-300 font-sans border-y border-neutral-800 py-3.5 my-2">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-200 shrink-0">1</span>
                <span>బ్రౌజర్‌లో క్రింద ఉన్న <strong>షేర్ (Share <Share className="inline h-3.5 w-3.5 text-blue-400" />)</strong> లేదా మెనూ (⋮) ఐకాన్‌పై క్లిక్ చేయండి.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-200 shrink-0">2</span>
                <span>క్రిందికి స్క్రోల్ చేసి <strong>'Add to Home Screen'</strong> (హోమ్ స్క్రీన్‌కు జోడించు) ఎంచుకోండి.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-200 shrink-0">3</span>
                <span><strong>Add</strong> పై క్లిక్ చేయండి. EIGHT NEWS యాప్ మీ హోమ్ స్క్రీన్‌పై యాడ్ అవుతుంది!</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIosInstructions(false)}
              className="w-full mt-2 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition-colors"
            >
              సరే, అర్థమైంది
            </button>
          </div>
        </div>
      )}
    </>
  );
}
