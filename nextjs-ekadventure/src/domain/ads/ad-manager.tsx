import { JSX } from "react";
import { providers } from "./ad-providers";
import { adRegistry } from "./ad-registry";
import { BaseAdConfig } from "./base-ad-config";

class AdManager {
  render(config: BaseAdConfig): JSX.Element {
    const uniqueId = `${config.provider}-${config.slotId}`;
    if (adRegistry.has(uniqueId)) return <></>;

    const provider = providers[config.provider as keyof typeof providers];
    if (!provider) return <></>;
  
    adRegistry.mark(uniqueId);

    return provider.render(config);
  }
}

export const adManager = new AdManager();
