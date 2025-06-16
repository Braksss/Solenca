/// <reference types="vite/client" />

interface ImportMetaEnv {
     readonly VITE_STRAPI_URL: string;
     readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
   }
   
   interface ImportMeta {
     readonly env: ImportMetaEnv;
   }
   