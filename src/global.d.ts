declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            context?: string;
          }) => void;
          renderButton: (
            element: HTMLElement | null,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "small" | "medium" | "large";
              width?: number;
              type?: "standard" | "icon";
              shape?: "rectangular" | "pill" | "circle";
              logo_alignment?: "left" | "center";
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export {};
