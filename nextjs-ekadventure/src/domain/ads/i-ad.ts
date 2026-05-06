import { JSX } from "react";
import { BaseAdConfig } from "./base-ad-config";

export interface IAd {
    render(config: BaseAdConfig): JSX.Element;
}