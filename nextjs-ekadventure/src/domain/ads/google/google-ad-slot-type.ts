import { AdFormatEnum } from "./implementations/google-ad-format-enum";
import { AdLayoutEnum } from "./implementations/google-ad-layout-enum";

export type GoogleAdSlotType = {
    title: string;
    slotId: string;
    className?: string;
    adFormat: AdFormatEnum;
    adLayout?: AdLayoutEnum;
};