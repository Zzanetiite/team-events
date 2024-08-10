// src/global.d.ts
export {};

declare global {
  interface Window {
    REACT_BASENAME?: string;
    DOMAIN?: string;
  }
}
