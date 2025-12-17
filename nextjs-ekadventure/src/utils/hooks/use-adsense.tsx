"use client";

import { useEffect, useRef } from "react";

export const useAdSense = (
  insRef?: React.RefObject<HTMLElement | null>
) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    const ins = insRef?.current;
    console.log("insRef current:", ins);

    if (!ins) return;

    // Skip if already initialized
    if (initializedRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initializedRef.current = true;
      console.log(`Ad slot pushed successfully`);
    } catch (e) {
      console.error("adsbygoogle push error:", e);
    }
  }, [insRef]);
};