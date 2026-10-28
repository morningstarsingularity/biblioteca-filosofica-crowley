import React, { useState, useEffect } from "react";
import { Download, WifiOff, X } from "lucide-react";
import { CROWLEY_AVATAR_URL, CROWLEY_NAME } from "../utils/tutorEngine";

interface CrowleyAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const CrowleyAvatar: React.FC<CrowleyAvatarProps> = ({
  size = "md",
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeMap = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-[#1e1b2e] border-2 border-[#c084fc]/60 shadow-sm shrink-0 flex items-center justify-center ${sizeMap[size]} ${className}`}
    >
      {!imgError ? (
        <img
          src={CROWLEY_AVATAR_URL}
          alt={`${CROWLEY_NAME} — Tutora Académica de Filosofía Griega`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top scale-110"
        />
      ) : (
        <span className="font-serif font-bold text-[#d8b4fe] text-sm">
          {CROWLEY_NAME.slice(0, 2)}
        </span>
      )}
    </div>
  );
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true;
    setIsInstalled(isStandalone);

    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (isInstalled) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-medium text-[#12111a] bg-[#c084fc] hover:bg-[#d8b4fe] rounded-lg transition-colors whitespace-nowrap shrink-0"
      >
        <Download className="w-3.5 h-3.5" />
        Instalar App
      </button>

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-[#1c192b] border border-white/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CrowleyAvatar size="sm" />
                <div>
                  <h3
                    id="pwa-install-title"
                    className="text-lg font-serif font-semibold text-[#f5f3ff]"
                  >
                    Instalar Biblioteca Filosófica - Crowley
                  </h3>
                  <p className="text-xs text-[#d8b4fe]">
                    Modo PWA Offline habilitado
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Cerrar guía de instalación"
                onClick={() => setShowModal(false)}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm text-[#e2dff0] space-y-2 leading-relaxed">
              {isIOS ? (
                <>
                  <p>
                    1. Toca el botón <strong>Compartir</strong> en la barra de
                    Safari.
                  </p>
                  <p>
                    2. Selecciona <strong>Agregar a pantalla de inicio</strong>{" "}
                    para usar a Crowley sin conexión.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Esta aplicación cuenta con{" "}
                    <strong className="text-[#c084fc]">manifest.json</strong> y{" "}
                    <strong className="text-[#f472b6]">service-worker.js</strong>{" "}
                    activos con caché offline de D3, Markmap y los 5 temas.
                  </p>
                  <p>
                    En el menú de tu navegador móvil o de escritorio, selecciona{" "}
                    <strong>«Instalar aplicación»</strong> o{" "}
                    <strong>«Añadir a pantalla de inicio»</strong>.
                  </p>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 min-h-[44px] rounded-lg bg-[#c084fc] text-[#12111a] text-xs font-semibold hover:bg-[#d8b4fe] transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-[#1c192b]/95 backdrop-blur-md border border-[#f472b6]/50 px-3.5 py-2 text-xs font-medium text-[#f5f3ff] shadow-lg"
    >
      <WifiOff className="w-3.5 h-3.5 text-[#f472b6]" />
      <span>Modo sin conexión — Caché local de Crowley activa</span>
    </div>
  );
};
