const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        yellow_clr: "#FFC106",
        pink_clr: "#FF00FF",
        border: "hsl(var(--border))",
        success: "#0ecb81",
        primary_1: "#141f7a",
        primary_2: "#3D38ED",
        primary_3: "#3C50E0",
        gray_1: "#efefef",
        gray_2: "#848484",
        white: "#FFF",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        transparent: "hsl(var(--transparent-clr))",
        background: "hsl(var(--background))",
        toast_background: "hsl(var(--toast-background))",
        err_toast_background: "hsl(var(--err-toast-background))",
        normal_toast_background: "hsl(var(--normal-toast-background))",



        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ring: {
          DEFAULT: "hsl(var(--ring))",
          foreground: "hsl(var(--ring))",
        },
        chart_1: {
          DEFAULT: "hsl(var(--chart-1))",
          foreground: "hsl(var(--chart-1))",
        },
        chart_2: {
          DEFAULT: "hsl(var(--chart-2))",
          foreground: "hsl(var(--chart-2))",
        },
        chart_3: {
          DEFAULT: "hsl(var(--chart-3))",
          foreground: "hsl(var(--chart-3))",
        },
        chart_4: {
          DEFAULT: "hsl(var(--chart-4))",
          foreground: "hsl(var(--chart-4))",
        },
        chart_5: {
          DEFAULT: "hsl(var(--chart-5))",
          foreground: "hsl(var(--chart-5))",
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
};
