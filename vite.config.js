import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/project-management/",
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Project Management",
        short_name: "Project Management",
        description:
          "Project Management - Your go-to app for all your project needs.",
        start_url: "",
        display: "standalone",
        background_color: "#dddddd",
        theme_color: "#38A7B6",
        orientation: "portrait",
        scope: "/",
        icons: [
          {
            src: "icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "public/icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "screenshots/mobile.PNG",
            sizes: "538x1163",
            type: "image/png",
            form_factor: "narrow", 
          },
          {
            src: "screenshots/desktopScreenshot.PNG",
            sizes: "1799x839",
            type: "image/png",
            form_factor: "wide", 
          },
        ],
        related_applications: [],
        prefer_related_applications: false,
      },
      registerType: "autoUpdate", // Automatically register service worker
      devOptions: {
        enabled: true, // Enable for dev mode],
      },
    }),
  ],
});
