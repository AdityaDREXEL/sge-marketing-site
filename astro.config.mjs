import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind"; // Use the official Astro Tailwind integration
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
// config.json is no longer needed here for site/base

// https://astro.build/config
export default defineConfig({
  // Use your actual custom domain here
  site: "https://www.yourdomain.com", // Replace with your domain
  // 'base' is typically not needed when using a custom domain at the root
  trailingSlash: "never", // Default and recommended for most hosts
  integrations: [
    tailwind(), // Official integration handles Tailwind setup
    react(),
    sitemap(),
    AutoImport({
      imports: [
        // Ensure these paths are correct relative to your project root
        // If they are in src/, the paths might need adjustment depending on AutoImport's config
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      // Use a theme built-in with Shiki, or add custom themes
      theme: "one-dark-pro",
      // Add 'dracula' if you want multiple themes
      // themes: {
      //  light: 'github-light',
      //  dark: 'github-dark',
      // },
      wrap: true, // Keep line wrapping enabled
    },
    // The custom async highlighter is no longer needed with built-in shikiConfig
    // highlighter: getHighlighter, // Remove this line
    // extendDefaultPlugins: true, // This is usually true by default
  },
  // vite: { plugins: [tailwindcss()] }, // Remove this, handled by the integration
});