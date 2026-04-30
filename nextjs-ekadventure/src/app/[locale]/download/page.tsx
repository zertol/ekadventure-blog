import DownloadContent from "@/components/ECommerce/DownloadContent";
import { generateProductDownloadLink } from "@/api/controllers/ecommerce";

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

const DownloadPage: React.FC<PageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return <p>Invalid download link. Token is missing.</p>;
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
  }

  return (
    downloadUrl && (
      <DownloadContent downloadUrl={downloadUrl} />
      )
  );
};

export default DownloadPage;