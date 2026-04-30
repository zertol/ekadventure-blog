"use client";

import { useEffect } from "react";

interface DownloadContentProps {
  downloadUrl: URLType | null;
}

const DownloadContent: React.FC<DownloadContentProps> = ({ downloadUrl }) => {
  useEffect(() => {
    if (downloadUrl?.url) {
      // trigger download
      const anchor = document.createElement("a");
      anchor.href = decodeURIComponent(downloadUrl.url) ?? "";
      anchor.download = "";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      
    }
  }, [downloadUrl]);

  return (
    <p>
      Your download has started. If it didn't,{" "}
      <a href={downloadUrl?.url ?? ""}>click here</a>.
    </p>
  );
};

export default DownloadContent;
