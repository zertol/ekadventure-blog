export const dynamic = "force-dynamic";

import Download from "@/components/Pages/Download";
import { generateProductDownloadLink } from "@/api/controllers/ecommerce";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

const DownloadPage: React.FC<PageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return notFound();
  }

  let downloadUrl: URLType | null = null;
  try {
    const response = await generateProductDownloadLink({ token });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (response.ErrorMessages && response.ErrorMessages.length > 0) {
      throw new Error(response.ErrorMessages.join(","));
    }

    downloadUrl = response.Result;
  } catch (err) {
    console.error(err);
    return notFound();
  }

  if (!downloadUrl) {
    return notFound();
  }

  return (
    downloadUrl && <Download downloadUrl={downloadUrl} tokenInUse={token} />
  );
};

export default DownloadPage;