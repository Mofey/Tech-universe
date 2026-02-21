import { useEffect, useState } from "react";
import { defaultConfig } from "../data/planets";
import type { UniverseConfig } from "../types/ml";

export function useElementSdkConfig() {
  const [config, setConfig] = useState<UniverseConfig>(defaultConfig);

  useEffect(() => {
    const sdk = window.elementSdk;
    if (!sdk) return;

    const onConfigChange = (cfg: Partial<UniverseConfig>) => {
      setConfig({
        universe_title: cfg.universe_title || defaultConfig.universe_title,
        welcome_message: cfg.welcome_message || defaultConfig.welcome_message,
      });
    };

    sdk.init({
      defaultConfig,
      onConfigChange,
      mapToCapabilities: () => ({
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined,
      }),
      mapToEditPanelValues: (cfg) =>
        new Map([
          ["universe_title", cfg.universe_title || defaultConfig.universe_title],
          ["welcome_message", cfg.welcome_message || defaultConfig.welcome_message],
        ]),
    });

    onConfigChange(sdk.config ?? defaultConfig);
  }, []);

  return config;
}
