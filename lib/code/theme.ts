import { PrismTheme } from "prism-react-renderer";

export const theme: PrismTheme = {
  plain: {
    color: "var(--syntax-txt)",
    backgroundColor: "var(--syntax-bg)",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "var(--syntax-comment)",
      },
    },
    {
      types: ["variable"],
      style: {
        color: "var(--syntax-str)",
      },
    },
    {
      types: ["keyword", "builtin", "operator"],
      style: {
        color: "var(--syntax-str)",
      },
    },
    {
      types: ["number"],
      style: {
        color: "var(--syntax-bool)",
        fontWeight: "var(--font-weight-medium)" as "500",
      },
    },
    {
      types: ["string"],
      style: {
        color: "var(--syntax-str)",
        fontWeight: "var(--font-weight-medium)" as "500",
      },
    },
    {
      types: ["tag", "punctuation", "class-name"],
      style: {
        color: "var(--syntax-prop)",
        fontWeight: "var(--font-weight-medium)" as "500",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "var(--syntax-name)",
        fontWeight: "var(--font-weight-medium)" as "500",
      },
    },
    {
      types: ["function"],
      style: {
        color: "var(--syntax-fn)",
      },
    },
  ],
};
