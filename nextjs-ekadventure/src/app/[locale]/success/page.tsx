import { verifyProcessedTokenFromSession } from "@/api/controllers/ecommerce";
import Success from "@/components/Pages/Success";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

const SuccessPage: React.FC<PageProps> = async ({ searchParams }) => {
    const params = await searchParams;
  const sessionId = params.session_id;

  if(!sessionId) {
    return notFound();
  }

  const processedResult = await verifyProcessedTokenFromSession({ sessionId });

  if (processedResult.ErrorMessages && processedResult.ErrorMessages.length > 0) {
    return notFound();
  }

  const result = processedResult.Result || { processed: false };

  return <Success isProcessed={result.processed} />;
};

export default SuccessPage;