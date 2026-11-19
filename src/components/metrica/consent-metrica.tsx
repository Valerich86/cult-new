"use client";

import { useEffect, useState, ReactNode } from "react";
import { YandexMetricaProvider, standardYMInitParameters } from "@artginzburg/next-ym";

const CONSENT_KEY = "cult-consent";

export default function ConsentMetrica({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    setConsent(localStorage.getItem(CONSENT_KEY) === "true");

    const onConsentChange = () =>
      setConsent(localStorage.getItem(CONSENT_KEY) === "true");

    window.addEventListener("consent-changed", onConsentChange);
    return () => window.removeEventListener("consent-changed", onConsentChange);
  }, []);

  // Пока не знаем состояние согласия — рендерим только детей, без скрипта
  if (consent !== true) {
    return <>{children}</>;
  }

  return (
    <YandexMetricaProvider initParameters={standardYMInitParameters}>
      {children}
    </YandexMetricaProvider>
  );
}
