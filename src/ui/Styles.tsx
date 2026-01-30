import { styled } from "storybook/theming";

/** Toolbar button default text color (matches Storybook toolbar). */
const TOOLBAR_BUTTON_COLOR = "rgb(115, 130, 140)";
/** Toolbar button hover color (Storybook blue). */
const TOOLBAR_BUTTON_HOVER_COLOR = "rgb(2, 156, 253)";
const TOOLBAR_BUTTON_HOVER_BG = "rgba(2, 156, 253, 0.14)";

/** CSS style element to make scrollbars thin and match Storybook style. */
export const THIN_SCROLLBAR_STYLE = (
  <style
    // biome-ignore lint/security/noDangerouslySetInnerHtml: static addon CSS only, no user input
    dangerouslySetInnerHTML={{
      __html: `
.rta-preview-viewport {
  scrollbar-width: thin;
  scrollbar-color: rgba(128, 128, 128, 0.6) transparent;
}
.rta-preview-viewport::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.rta-preview-viewport::-webkit-scrollbar-track {
  background: transparent;
}
.rta-preview-viewport::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.6);
  border-radius: 4px;
}
.rta-preview-viewport::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.8);
}
`,
    }}
  />
);

/** CSS for Fit button flash when autofit is called (border highlight that fades out). */
export const FIT_BUTTON_FLASH_STYLE = (
  <style
    // biome-ignore lint/security/noDangerouslySetInnerHtml: static addon CSS only, no user input
    dangerouslySetInnerHTML={{
      __html: `
@keyframes rta-fit-flash {
  0% { box-shadow: 0 0 0 2px rgba(2, 156, 253, 0.7); }
  100% { box-shadow: none; }
}
.rta-preview-toolbar button[data-flashing="true"] {
  animation: rta-fit-flash 500ms ease-out forwards;
}
`,
    }}
  />
);

/** Resolve toolbar/bar colors so the addon matches Storybook toolbar in light and dark. */
function getToolbarColors(theme: {
  base?: string;
  barBg?: string;
  barTextColor?: string;
  barHoverColor?: string;
  barSelectedColor?: string;
  appBorderColor?: string;
}) {
  return {
    border: theme.appBorderColor ?? (theme.base === "dark" ? "#333" : "#ccc"),
    /** Default toolbar button text (muted); match Storybook's toolbar icon color. */
    buttonColor: theme.barTextColor ?? TOOLBAR_BUTTON_COLOR,
    /** Hover: use theme secondary/highlight or Storybook blue. */
    buttonHoverColor: theme.barHoverColor ?? theme.barSelectedColor ?? TOOLBAR_BUTTON_HOVER_COLOR,
    buttonHoverBg: TOOLBAR_BUTTON_HOVER_BG,
    selectedBg: theme.barSelectedColor ?? (theme.base === "dark" ? "#3d3d3d" : "#e0e0e0"),
    selectedText: theme.base === "dark" ? "#fff" : "#1a1a1a",
  };
}

/** Resolve input/control colors from theme. */
function getInputColors(theme: {
  base?: string;
  inputBg?: string;
  inputTextColor?: string;
  appBorderColor?: string;
  textMutedColor?: string;
}) {
  const dark = theme.base === "dark";
  return {
    bg: theme.inputBg ?? (dark ? "#2d2d2d" : "#fff"),
    text: theme.inputTextColor ?? (dark ? "#eee" : "#333"),
    border: theme.appBorderColor ?? (dark ? "#444" : "#ccc"),
    muted: theme.textMutedColor ?? (dark ? "#999" : "#666"),
  };
}

const fontSize = (theme: { typography?: { size?: { s2?: number } } }) =>
  theme.typography?.size?.s2 ?? 12;
const radius = (theme: { appBorderRadius?: number }) => theme.appBorderRadius ?? 4;

/** Outer container for the toolbar; inline flex with theme gap. */
export const Toolbar = styled.div(({ theme }) => {
  const { border } = getToolbarColors(theme);
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.layoutMargin ?? 8,
    padding: "0 4px",
    borderLeft: `1px solid ${border}`,
    marginLeft: 4,
  };
});

/** Label for form controls (device, zoom, width, height). */
export const Label = styled.label(({ theme }) => {
  const { muted } = getInputColors(theme);
  return {
    fontSize: fontSize(theme),
    color: muted,
    marginRight: 4,
  };
});

/** Readonly zoom percentage display in toolbar (muted, same font size). */
export const ZoomPercent = styled.span(({ theme }) => {
  const { muted } = getInputColors(theme);
  return {
    fontSize: fontSize(theme),
    color: muted,
    minWidth: 36,
    textAlign: "right" as const,
    userSelect: "none" as const,
  };
});

/** Native select styled to match Storybook toolbar and inputs. */
export const Select = styled.select(({ theme }) => {
  const { bg, text, border } = getInputColors(theme);
  return {
    padding: "4px 8px",
    fontSize: fontSize(theme),
    border: `1px solid ${border}`,
    borderRadius: radius(theme),
    background: bg,
    color: text,
    minWidth: 120,
  };
});

/** Action button (zoom, rotate, toggles); matches Storybook toolbar button style. */
export const Button = styled.button(({ theme }) => {
  const { buttonColor, buttonHoverColor, buttonHoverBg, selectedBg, selectedText } =
    getToolbarColors(theme);
  return {
    border: 0,
    cursor: "pointer",
    gap: 6,
    justifyContent: "center",
    overflow: "hidden",
    padding: "0 7px",
    height: 28,
    position: "relative",
    textAlign: "center",
    textDecoration: "none",
    transitionProperty: "background, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-out",
    verticalAlign: "top",
    whiteSpace: "nowrap",
    userSelect: "none",
    opacity: 1,
    margin: 0,
    fontSize: fontSize(theme),
    fontWeight: 700,
    lineHeight: 1,
    background: "transparent",
    color: buttonColor,
    boxShadow: "none",
    borderRadius: radius(theme),
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    "& svg": {
      color: buttonColor,
    },
    "&:hover:not(:disabled)": {
      color: buttonHoverColor,
      background: buttonHoverBg,
    },
    "&:hover:not(:disabled) svg": {
      color: buttonHoverColor,
    },
    "&[aria-pressed='true']": {
      background: selectedBg,
      color: selectedText,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  };
});

/** Number input for custom width and height. */
export const Input = styled.input(({ theme }) => {
  const { bg, text, border } = getInputColors(theme);
  return {
    width: 56,
    padding: "4px 6px",
    fontSize: fontSize(theme),
    border: `1px solid ${border}`,
    borderRadius: radius(theme),
    background: bg,
    color: text,
  };
});

/** Horizontal flex container for a single control group (e.g. device dropdown, zoom buttons). */
export const Row = styled.div({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
});
