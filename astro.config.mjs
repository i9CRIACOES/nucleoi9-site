// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Em produção o nginx do Plesk faz este mesmo encaminhamento; aqui é só
// para a lista de espera funcionar no `astro dev`.
const LISTA_ESPERA_API =
  "https://api.nucleoi9.com.br/api/public/formularios/4d7277ac-a36d-48b9-b4b8-f7ef6fcbdd75";

// https://astro.build/config
export default defineConfig({
  site: "https://nucleoi9.com.br",
  trailingSlash: "ignore",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        "/api/lista-espera": {
          target: LISTA_ESPERA_API,
          changeOrigin: true,
          rewrite: () => "",
        },
      },
    },
  },
});
