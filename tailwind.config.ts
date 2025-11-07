import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        inter: ['var(--font-inter)'], lazydog: ['Lazydog', 'sans-serif'], sans: ["var(--font-manrope)", "sans-serif"]
      },
      screens: {
        'xs': '400px', // 👈 custom breakpoint
      },
    },
  },
  plugins: [
    /**
     * Add custom perspective utilities
     */
    function ({
      addUtilities,
    }: {
      addUtilities: (utils: Record<string, Record<string, string>>) => void;
    }) {
      addUtilities({
        ".perspective-1000": {
          perspective: "1000px",
        },
      });
    },
  ],
} satisfies Config;
