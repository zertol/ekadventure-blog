"use client";
import { useCookieConsent } from "@/store/CookieConsentContext";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "use-intl";

export function ClientAdWrapper({
  children,
  className,
  headerText,
  isCollapsible = true,
  onHeightChange,
}: {
  children: React.ReactNode;
  className?: string;
  headerText?: string;
  isCollapsible?: boolean;
  onHeightChange?: (height: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [hasContent, setHasContent] = useState({ isVisible: false, height: 0 });
  const [opened, setOpened] = useState(true);

  const consentData = useCookieConsent();

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.contentRect.height;
        if (height > 0) {
          setHasContent({ isVisible: true, height: height });
          onHeightChange?.(height);
        }
      }
    });

    resizeObserver.observe(content);
    return () => resizeObserver.disconnect();
  }, [consentData.isFirstVisit]);

  const calc = (): string => {
    if (hasContent.isVisible) {
      return opened ? hasContent.height + "px" : "0";
    }
    return "initial";
  };

  const t = useTranslations("Ads");

  return (
    <div
      className={`${consentData.isFirstVisit ? "hidden" : " "} ${hasContent.isVisible && className}`}
    >
      <div
        className={`${hasContent.isVisible ? "rounded-md border border-neutral-400 bg-background-blue-accent/40" : ""}
       `}
      >
        {hasContent.isVisible && (
          <div className={`w-full p-2`}>
            {!isCollapsible && (
              <div>
                <p className="font-semibold">
                  {t("sponsoredContentWrapperTitle")} {headerText}
                </p>
              </div>
            )}
            {isCollapsible && (
              <button
                onClick={() => setOpened(!opened)}
                className="flex w-full justify-between"
              >
                <div>
                  <p className="font-semibold">
                    {t("sponsoredContentWrapperTitle")} {headerText}
                  </p>
                </div>
                {opened ? (
                  <svg
                    className={`fill-current w-4 h-4 flex-shrink-0`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708z" />
                    <path d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                  </svg>
                ) : (
                  <svg
                    className={`fill-current w-4 h-4 flex-shrink-0`}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                    />
                    <path
                      fillRule="evenodd"
                      d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        )}
        <div
          className={`custom-scrollbar transition-all duration-300 ease-in-out overflow-hidden`}
          ref={containerRef}
          style={{ maxHeight: calc() }}
        >
          <div ref={contentRef}>{children}</div>
        </div>
      </div>
    </div>
  );
}
