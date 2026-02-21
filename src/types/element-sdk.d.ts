import type { UniverseConfig } from "./ml";

declare global {
  interface Window {
    elementSdk?: {
      config?: Partial<UniverseConfig>;
      init: (args: {
        defaultConfig: UniverseConfig;
        onConfigChange: (cfg: Partial<UniverseConfig>) => void;
        mapToCapabilities: (cfg: Partial<UniverseConfig>) => {
          recolorables: string[];
          borderables: string[];
          fontEditable?: unknown;
          fontSizeable?: unknown;
        };
        mapToEditPanelValues: (cfg: Partial<UniverseConfig>) => Map<string, string>;
      }) => void;
    };
  }
}

export {};
