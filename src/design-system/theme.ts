import { styleTokens } from './tokens'

// Semantic token-to-variable mapping simplifies theming across the application
const themeVariables: Record<string, string> = {
  '--color-background': styleTokens.color.background,
  '--color-surface': styleTokens.color.surface,
  '--color-border': styleTokens.color.border,
  '--color-text': styleTokens.color.text,
  '--color-text-muted': styleTokens.color.textMuted,
  '--color-interactive': styleTokens.color.interactive,
  '--color-interactive-hover': styleTokens.color.interactiveHover,
  '--color-focus-ring': styleTokens.color.focusRing,
  '--space-xs': styleTokens.spacing.xs,
  '--space-sm': styleTokens.spacing.sm,
  '--space-md': styleTokens.spacing.md,
  '--space-lg': styleTokens.spacing.lg,
  '--space-xl': styleTokens.spacing.xl,
  '--space-xxl': styleTokens.spacing.xxl,
  '--radius-sm': styleTokens.radius.sm,
  '--radius-md': styleTokens.radius.md,
  '--font-family-base': styleTokens.typography.fontFamilyBase,
  '--font-family-mono': styleTokens.typography.fontFamilyMono,
  '--font-size-sm': styleTokens.typography.sm,
  '--font-size-md': styleTokens.typography.md,
  '--font-size-lg': styleTokens.typography.lg,
  '--line-height-sm': styleTokens.typography.lineHeightSm,
  '--line-height-md': styleTokens.typography.lineHeightMd,
  '--line-height-lg': styleTokens.typography.lineHeightLg,
  '--font-weight-normal': String(styleTokens.typography.weightNormal),
  '--font-weight-medium': String(styleTokens.typography.weightMedium),
  '--font-weight-semibold': String(styleTokens.typography.weightSemibold),
  '--motion-fast': styleTokens.motion.fast,
  '--motion-normal': styleTokens.motion.normal,
}

export function applyThemeVariables(
  root: HTMLElement = document.documentElement
) {
  Object.entries(themeVariables).forEach(([name, value]) => {
    root.style.setProperty(name, value)
  })
}
