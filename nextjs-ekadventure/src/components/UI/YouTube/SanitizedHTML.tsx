'use client';

import DOMPurify from 'isomorphic-dompurify';

interface SanitizedHTMLProps {
  html: string;
}

export default function SanitizedHTML({ html }: SanitizedHTMLProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
    />
  );
}
