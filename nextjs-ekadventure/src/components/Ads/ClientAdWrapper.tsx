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

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.scrollHeight == 0) return;

    setHasContent({ isVisible: true, height: container.offsetHeight });
  }, [containerRef.current?.scrollHeight]);

  if (!hasContent.isVisible) {
    return null;
  }

  return (
    <div className={`${hasContent.isVisible && className}`} ref={containerRef}>
      {headerText && <p>{headerText}</p>}
      {children}
    </div>
  );
}
