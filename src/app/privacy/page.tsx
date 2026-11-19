import { Metadata } from "next";
import { font_accent, font_caption } from "../../lib/fonts";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика использования Яндекс Метрики на сайте тату-салона CULT",
};

export default function PrivacyPolicy() {
  return (
    <main className="pt-10 pb-40 relative overflow-hidden w-full text-base x-spacing">
      <article className="flex flex-col gap-5">
        <h1
          className={`${font_accent.className} text-3xl sm:text-7xl xl:text-5xl text-center xl:text-start`}
        >
          Политика конфиденциальности
        </h1>
        <section className="border-b border-white text-gray-500 w-full text-center xl:text-start">
          <span>Редакция от 18.11.2026</span>
        </section>

        <section>
          <strong className="uppercase">1.Общие положения</strong>
          <p>
            Настоящая политика распространяется на сайт{" "}
            <a
              href={"/"}
              className={`${font_caption.className} link text-peachy2`}
            >
              culttattoo.ru
            </a>
            . Оператором обработки персональных данных является физическое лицо
            — Тарасов Андрей Николаевич. Email:{" "}
            <a
              href="mailto:tanforever@mail.ru"
              target="_blank"
              className={`${font_caption.className} link text-peachy2`}
            >
              tanforever@mail.ru
            </a>{" , "}
            тел: +7(963)017-30-55
          </p>
        </section>

        <section>
          <strong className="uppercase">2.Какие cookies мы собираем</strong>
          <p>
            При наличие вашего согласия используются аналитические cookies
            сервиса «Яндекс.Метрика» ООО «Яндекс» (119021, Москва, ул. Льва Толстого, 16) с целью анализа посещаемости сайта: источники
            трафика, страницы, время на сайте, карты кликов, вебвизор. 
            Также собираются обезличенные данные, такие как IP-адрес, версия браузера, геолокация. 
            Данные хранятся на серверах Яндекса. Политика конфиденциальности Яндекса:{" "}
            <a
              href={"https://yandex.ru/legal/confidential/ru/"}
              className={`${font_caption.className} link text-peachy2`}
            >
              yandex.ru/legal/confidential
            </a>{" . "}
            Условия использования сервиса Яндекс Метрика:{" "}
            <a
              href={"https://yandex.ru/legal/metrica_termsofuse"}
              className={`${font_caption.className} link text-peachy2`}
            >
              https://yandex.ru/legal/metrica_termsofuse
            </a>{" . "}
            Срок хранения: до 1 года. Основание: согласие пользователя (ст. 6 ч.
            1 п. 1 152-ФЗ).
          </p>
        </section>

        <section>
          <strong className="uppercase">3.Согласие и отказ</strong>
          <p>
            При первом посещении сайта появляется баннер с кнопками «Принять» и
            «Отклонить».
            <ul className="list-disc pl-5">
              <li>
                «Принять» — аналитические cookies активируются немедленно и при
                каждом последующем посещении.
              </li>
              <li>
                «Отклонить» — счетчики не загружаются, аналитические cookies не
                устанавливаются.
              </li>
            </ul>
            Ваш выбор сохраняется в localStorage браузера под ключом
            cult_consent. Данные сайта можно очистить в браузере — баннер
            появится снова.
          </p>
        </section>

        <section>
          <strong className="uppercase">4.Управление cookies через браузер</strong>
          <p>
            Большинство браузеров позволяют управлять cookies в настройках. Вы
            можете заблокировать или удалить cookies для конкретного сайта или
            для всех сайтов.
            <ul className="list-disc pl-5">
              <li>
                <a
                  href={"https://support.google.com/chrome/answer/95647"}
                  className={`${font_caption.className} link text-peachy2`}
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://support.mozilla.org/ru/kb/usilennaya-zashita-ot-otslezhivaniya-v-firefox"
                  }
                  className={`${font_caption.className} link text-peachy2`}
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://support.apple.com/ru-ru/guide/safari/sfri11471/mac"
                  }
                  className={`${font_caption.className} link text-peachy2`}
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://support.microsoft.com/ru-ru/windows/delete-and-manage-cookies"
                  }
                  className={`${font_caption.className} link text-peachy2`}
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </p>
        </section>

        <section>
          <strong className="uppercase">5.Изменения в политике</strong>
          <p>
            Оператор вправе вносить изменения в настоящую политику. Актуальная
            версия всегда размещена на данной странице с указанием даты
            последней редакции.
          </p>
        </section>

        <section>
          <strong className="uppercase">6.Контакты</strong>
          <p>
            По вопросам использования cookies: 
            <a
              href="mailto:ryazanov_suspense@mail.ru"
              target="_blank"
              className={`${font_caption.className} link text-peachy2`}
            >
              ryazanov_suspense@mail.ru
            </a>
          </p>
        </section>
      </article>
    </main>
  );
}
