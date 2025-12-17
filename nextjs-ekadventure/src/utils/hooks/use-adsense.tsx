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

    if (initializedRef.current) return;

    if (ins.querySelector("iframe")) {
      initializedRef.current = true;
      return;
    }

    try {
        initializedRef.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      
    } catch (e) {
      console.error("adsbygoogle push error:", e);
    }
  }, [insRef]);

  return {insRef};
};