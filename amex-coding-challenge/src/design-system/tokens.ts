export const styleTokens = {
  color: {
    background: '#ffffff',
    surface: '#f8fafc',
    border: '#cbd5e1',
    text: '#0f172a',
    textMuted: '#334155',
    interactive: '#1d4ed8',
    interactiveHover: '#d4dfff',
    focusRing: '#2563eb',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    xxl: '2rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
  },
  typography: {
    fontFamilyBase:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontFamilyMono:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    lineHeightSm: '1.25rem',
    lineHeightMd: '1.5rem',
    lineHeightLg: '1.75rem',
    weightNormal: 400,
    weightMedium: 500,
    weightSemibold: 600,
  },
  motion: {
    fast: '120ms',
    normal: '180ms',
  },
} as const

export type StyleTokens = typeof styleTokens
