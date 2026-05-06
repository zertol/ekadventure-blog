import { IValidatable } from "@/domain/common/i-validatable";
import { AdFormatEnum } from "./google-ad-format-enum";
import { GoogleAdSlotConfig } from "../google-ad-slot-config";

export class GoogleAdConfigValidator implements IValidatable {
    constructor(private config: GoogleAdSlotConfig) {
        this.validate();
    }

    validate(): void {
        const slotId = this.config.slotId;

        if (!slotId) throw new Error("adSlot is required");
        if (!/^\d+$/.test(slotId)) throw new Error("adSlot must be numeric");
        if (slotId.length < 8) throw new Error("adSlot is too short");

        if (this.config.adLayout && this.config.adFormat !== AdFormatEnum.Fluid) {
            throw new Error("adLayout requires adFormat to be fluid");
        }
        if (!Object.values(AdFormatEnum).includes(this.config.adFormat)) {
            throw new Error(`adFormat must be one of: ${Object.values(AdFormatEnum).filter(v => v).join(", ")}`);
        }
    }
}