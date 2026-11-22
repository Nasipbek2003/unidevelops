import Script from "next/script";
import { GA_ID, YM_ID } from "@/lib/analytics";
import { ClickGoals } from "./ClickGoals";

/**
 * Счётчики и делегированные цели кликов. Без NEXT_PUBLIC_YM_ID и NEXT_PUBLIC_GA_ID
 * ничего не рендерится. Вебвизор Метрики выключен: он записывает поля формы с личными данными.
 */
export function Analytics() {
  if (YM_ID === null && GA_ID === null) return null;
  return (
    <>
      {YM_ID !== null && (
        <Script id="ym-init" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`}
        </Script>
      )}
      {GA_ID !== null && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag("js",new Date());gtag("config","${GA_ID}");`}
          </Script>
        </>
      )}
      <ClickGoals />
    </>
  );
}
