"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface CookieBannerProps {
  onConsentGiven?: () => void;
  onRevoke?: () => void;
}

export default function CookieBanner({
  onConsentGiven,
  onRevoke,
}: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasConsent, setHasConsent] = useState<boolean>(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (
      path === "/privacy" ||
      path.startsWith("/admin") ||
      path.startsWith("/auth")
    ) {
      setIsVisible(false);
      return;
    }
    const accepted = localStorage.getItem("cult-consent") === "true";
    setHasConsent(accepted);

    // Показываем баннер, только если согласия ещё нет
    if (!accepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cult-consent", "true");
    setIsVisible(false);
    window.dispatchEvent(new Event("consent-changed")); // ← Метрика смонтируется
  };

  const handleRevoke = () => {
    localStorage.removeItem("cult-consent");
    setIsVisible(false);
    // Метрика уже загружена, корректно «выгрузить» её нельзя — просто перезагружаем страницу
    window.location.reload();
  };

  if (hasConsent || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white shadow x-spacing py-2 animate-bunner">
      <div className="flex flex-wrap justify-center xl:justify-between items-center gap-y-2 w-full">
        <div className="text-sm text-brown/70 text-center w-full">
          <p>
            Мы используем cookies Яндекс.Метрики для анализа посещаемости сайта.
            Подробнее в{" "}
            <Link href="/privacy" target="_blank" className="underline">
              Политике конфиденциальности
            </Link>
          </p>
        </div>

        <div className="flex gap-2 w-full justify-center">
          <button
            onClick={handleAccept}
            className="text-peachy1 py-1"
            style={{ width: "100px" }}
          >
            Принять
          </button>
          <button
            onClick={handleRevoke}
            className="text-secondary py-1 px-5"
            style={{ backgroundColor: "#8c5e4d", width: "100px" }}
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
}
