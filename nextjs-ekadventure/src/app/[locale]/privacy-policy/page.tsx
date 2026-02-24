import { fetchPrivacyPolicyPage } from "@/api/controllers/pages";
import { generateBlockComponents } from "@/components/Data/BlockComponents";
import Footer from "@/components/Layout/Footer/page";
import HelpButtons from "@/components/UI/Common/HelpButtons/page";
import { formatDate } from "@/utils/data/helpers";
import { PortableText } from "@portabletext/react";
import { useLocale } from "next-intl";
import { getTranslations, getLocale } from "next-intl/server";

export default async function PrivacyPolicyPage() {
  const [privacyPolicy] = await Promise.all([fetchPrivacyPolicyPage()]);
  const [tPrivacyPolicy, locale] = await Promise.all([
    getTranslations("PrivacyPolicy"),
    getLocale(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-center-col pt-10 pb-20 flex-1">
        <div className="container px-c-25">
          <HelpButtons />
          {privacyPolicy.Result && (
            <>
              <h1 className="mb-1">{tPrivacyPolicy("privacyPolicyTitle")}</h1>
              <div className="prose max-w-none mb-5">
                <span className="mr-1 font-semibold">
                  {tPrivacyPolicy("lastUpdatedText")}
                </span>
                <span className="text-text-dark/85 capitalize">
                  {formatDate(privacyPolicy.Result.updatedAt, locale)}
                </span>
              </div>
              <div className="bg-background-green-accent/80 p-[10px] md:p-4 rounded-md w-full h-[500px] overflow-auto">
                <PortableText
                  value={privacyPolicy.Result.content}
                  components={generateBlockComponents()}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
