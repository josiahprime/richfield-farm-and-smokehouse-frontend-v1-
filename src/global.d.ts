declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (opts: any) => void;
          renderButton: (element: HTMLElement | null, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export {};
