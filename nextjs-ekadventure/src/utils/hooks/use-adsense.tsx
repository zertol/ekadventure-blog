"use client";

import { useEffect, useRef } from "react";

export const useAdSense = (
  insRef?: React.RefObject<HTMLElement | null>
) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    const ins = insRef?.current;
    if (!ins) return;

    if (initializedRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initializedRef.current = true;
    } catch (e) {
      console.error("adsbygoogle push error:", e);
    }
  }, [insRef]);
};