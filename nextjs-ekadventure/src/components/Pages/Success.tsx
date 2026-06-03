import { useTranslations } from "next-intl";
import NewsLetterForm from "../UI/Common/Form/NewsLetterForm/page";
import HelpButtons from "../UI/Common/HelpButtons/page";
import { HikerDescrtiptionText } from "../UI/Common/Hiker/HikerDescriptionText";
import { HikerHeaderText } from "../UI/Common/Hiker/HikerHeaderText";
import { HikerImage } from "../UI/Common/Hiker/HikerImage";

interface SuccessProps {
  isProcessed: boolean;
}

const Success: React.FC<SuccessProps> = ({ isProcessed }) => {
  const tShop = useTranslations("Shop");

  const descriptionText = tShop.rich("thankYouPurchaseDescription", {
    br: () => <br />,
    strong: (chunks) => <strong>{chunks}</strong>,
  });

  const receiptText = tShop("thankYouPurchaseReceiptText");

  const ourShopText = tShop.rich("thankYouPurchaseOurShopText", {
    strong: (chunks) => <strong>{chunks}</strong>,
  });

  return (
    <div className="h-screen flex flex-col justify-start md:justify-center items-center overflow-auto">
      <div className="container px-c-25 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-center gap-4 min-h-[400px]">
          <HikerImage />
          <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start lg:justify-center text-center lg:text-left">
            <div className="lg:w-[80%]">
              <HikerHeaderText>
                {isProcessed
                  ? tShop("alreadyProcessedHeaderText")
                  : tShop("thankYouPurchaseHeaderText")}
              </HikerHeaderText>

              {isProcessed ? (
                <HikerDescrtiptionText
                  text={tShop("alreadyProcessedContactMeText")}
                />
              ) : (
                <>
                  <HikerDescrtiptionText text={descriptionText} />

                  <div className="flex flex-col justify-center items-center md:items-start">
                    <ul className="list-disc pl-5">
                      <li>
                        <HikerDescrtiptionText
                          text={receiptText}
                          className="text-left md:text-left md:mb-2"
                        />
                      </li>
                      <li>
                        <HikerDescrtiptionText
                          text={ourShopText}
                          className="text-left"
                        />
                      </li>
                    </ul>
                  </div>

                  <HikerDescrtiptionText
                    text={tShop("thankYouPurchaseCheckSpamText")}
                  />
                </>
              )}

              <HelpButtons />

              <HikerDescrtiptionText
                text={tShop("thankYouPurchaseSubscribeNewsletterText")}
              />

              <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full text-center">
                <NewsLetterForm newsLetterAction="subscribe" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;