import { JSX } from "react";
import { IAd } from "../../i-ad";
import { ClientAdWrapper } from "@/components/Ads/ClientAdWrapper";
import GoogleAdSlot from "@/components/Ads/Google/GoogleAdSlot";
import { BaseAdConfig } from "../../base-ad-config";
import { GoogleAdConfigValidator } from "./google-ad-config";
import { isGoogleAdSlotConfig } from "@/utils/data/helpers";

export class GoogleAd implements IAd {
  render(config: BaseAdConfig): JSX.Element {
    if (!isGoogleAdSlotConfig(config)) {
      throw new Error("Invalid config for GoogleAd");
    }

    new GoogleAdConfigValidator(config).validate();

    return (
      <ClientAdWrapper
        headerText={config.title}
        className={config.wrapper?.className}
        isCollapsible={config.wrapper?.isCollapsible}
      >
        <GoogleAdSlot config={config} />
      </ClientAdWrapper>
    );
  }
}
