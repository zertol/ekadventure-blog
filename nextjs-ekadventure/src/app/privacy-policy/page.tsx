import { fetchPrivacyPolicyPage } from "@/api/controllers/pages";
import { PortableText } from "@portabletext/react";

export default async function PrivacyPolicyPage() {
  const [privacyPolicy] = await Promise.all([fetchPrivacyPolicyPage()]);

  return (
    <div>
        {privacyPolicy.Result && (
            <PortableText value={privacyPolicy.Result.content} />
        )}
    </div>
  );
}