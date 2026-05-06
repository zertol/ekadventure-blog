import { JSX } from "react";
import { providers } from "./ad-providers";
import { BaseAdConfig } from "./base-ad-config";

class AdManager {
  render(config: BaseAdConfig): JSX.Element {
    const provider = providers[config.provider as keyof typeof providers];
    if (!provider) return <></>;

    return provider.render(config);
  }
}

export const adManager = new AdManager();
