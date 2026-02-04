import { fetchPrivacyPolicyPage } from "@/api/controllers/pages";
import { generateBlockComponents } from "@/components/Data/BlockComponents";
import Footer from "@/components/Layout/Footer/page";
import HelpButtons from "@/components/UI/Common/HelpButtons/page";
import { PortableText } from "@portabletext/react";

export default async function PrivacyPolicyPage() {
  const [privacyPolicy] = await Promise.all([fetchPrivacyPolicyPage()]);

  return (
    <>
      <div className=" flex-center-col pt-10 pb-20">
        <div className="container px-c-25">
          <HelpButtons />
          {privacyPolicy.Result && (
            <>
              <h1 className="mb-1">Privacy Policy</h1>
              <div className="prose max-w-none mb-5">
                <span className="mr-1 font-semibold">Last Updated:</span>
                <span className="text-text-dark/85">
                  {new Date(privacyPolicy.Result?.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
              <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full h-[500px] overflow-auto">
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
    </>
  );
}
