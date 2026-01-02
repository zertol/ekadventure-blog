"use client";
import { useEffect, useRef, useState } from "react";

export function ClientAdWrapper({
  children,
  className,
  headerText,
}: {
  children: React.ReactNode;
  className?: string;
  headerText?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasContent, setHasContent] = useState({ isVisible: false, height: 0 });
  const [opened, setOpened] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.offsetHeight == 0) return;

    setHasContent((prev) => {
      return { isVisible: true, height: container.offsetHeight };
    });
  }, [containerRef.current]);

  const calc = (): string => {
    if (hasContent.isVisible) {
      return opened ? hasContent.height + "px" : "0";
    }
    return "initial";
  };

  return (
    <div
      className={`${hasContent.isVisible ? "rounded-md border border-neutral-200 bg-background-blue-accent/35" : ""}
       ${hasContent.isVisible && className}`}
    >
      {hasContent.isVisible && (
        <div className={`w-full p-2`}>
          <button
            onClick={() => setOpened(!opened)}
            className="flex w-full justify-between"
          >
            <div>
              <p>{headerText}</p>
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
        </div>
      )}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${hasContent.isVisible ? "p-2" : ""}`}
        ref={containerRef}
        style={{ maxHeight: calc() }}
      >
        {children}
      </div>
    </div>
  );
}
