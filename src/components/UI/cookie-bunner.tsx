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
    if (path === "/privacy") {
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
    setHasConsent(true);
    // Здесь можно безопасно инициализировать Яндекс Метрику
    console.log("Пользователь дал согласие — можно загружать скрипт Метрики");
    // Например, вызвать функцию загрузки скрипта из отдельного модуля
  };

  const handleRevoke = () => {
    // Удаляем согласие, чтобы баннер снова появился при следующем визите
    localStorage.removeItem("cult-consent");
    setIsVisible(false);
    setHasConsent(false);
    console.log("Согласие отозвано — скрипт Метрики не должен загружаться");
  };

  if (hasConsent || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white shadow p-3 animate-bunner">
      <div className="flex flex-wrap justify-center xl:justify-between items-center gap-y-3 w-full">
        <h3 className="font-bold">Мы используем Яндекс Метрику</h3>
        <p className="text-sm text-brown/70">
          Подробнее — в{" "}
          <Link href="/privacy" target="_blank" className="underline">
            Политике конфиденциальности
          </Link>
        </p>

        <div>
          <button onClick={handleAccept} className="text-secondary py-1 px-3">
            Принять и продолжить
          </button>
        </div>

        {/* Кнопка отзыва — опционально, можно убрать, если не нужна прямо в баннере */}
        {/* <button
            onClick={handleRevoke}
            type="button"
            className="text-gray-500 text-sm font-medium hover:text-gray-700 underline transition-colors"
          >
            Отозвать согласие
          </button> */}
      </div>
    </div>
  );
}
