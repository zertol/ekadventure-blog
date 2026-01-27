import { fetchPrivacyPolicyPage } from "@/api/controllers/pages";
import { generateBlockComponents } from "@/components/Data/BlockComponents";
import PrimaryButton from "@/components/UI/Common/PrimaryButton/page";
import { PortableText } from "@portabletext/react";

export default async function PrivacyPolicyPage() {
  const [privacyPolicy] = await Promise.all([fetchPrivacyPolicyPage()]);

  return (
    <div className=" flex-center-col pt-10">
      <div className="container px-c-25 lg:px-0">
        <div className="flex gap-4 mb-6 justify-center">
          <PrimaryButton
            href="/"
            text="📍 Trailhead"
            className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
          />
          <PrimaryButton
            href="/blog"
            text="🥾 Adventures"
            className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
          />
          <PrimaryButton
            href="/contact"
            text="📞 Get Help"
            className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
          />
        </div>
        {privacyPolicy.Result && (
          <>
            <h1 className="mb-1">Privacy Policy</h1>
            <div className="prose max-w-none mb-5">
              <span className="mr-1 font-semibold">
                Last Updated:
              </span>
              <span className="text-text-dark/85">
                {new Date(privacyPolicy.Result?.updatedAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </span>
            </div>
            <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full h-[700px] overflow-auto">
              <PortableText
                value={privacyPolicy.Result.content}
                components={generateBlockComponents()}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
