import { BaseAdConfig } from "../base-ad-config";
import { AdFormatEnum } from "./implementations/google-ad-format-enum";
import { AdLayoutEnum } from "./implementations/google-ad-layout-enum";

export interface GoogleAdSlotConfig extends BaseAdConfig {
    adFormat: AdFormatEnum;
    adLayout?: AdLayoutEnum;
    className?: string;
}