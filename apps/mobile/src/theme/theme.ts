export const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#0f172a',
    textMuted: '#64748b',
    primary: '#ef4444', // Red-500
    primaryForeground: '#fef2f2',
    secondary: '#f1f5f9',
    secondaryForeground: '#0f172a',
    card: '#ffffff',
    cardBorder: '#e2e8f0',
    border: '#e2e8f0',
    input: '#f8fafc',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    shadow: '#000000',
    accent: '#f97316', // Orange-500
    tabBarBackground: '#ffffff',
    tabBarActive: '#0f172a',
    tabBarInactive: '#94a3b8',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
};

export const darkTheme = {
  colors: {
    background: '#090d16', // Slate-950 dark
    text: '#f8fafc',
    textMuted: '#94a3b8',
    primary: '#ef4444',
    primaryForeground: '#fef2f2',
    secondary: '#1e293b',
    secondaryForeground: '#f8fafc',
    card: '#0f172a', // Slate-900
    cardBorder: '#1e293b',
    border: '#1e293b',
    input: '#0f172a',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    shadow: '#000000',
    accent: '#f97316',
    tabBarBackground: '#0f172a',
    tabBarActive: '#ef4444',
    tabBarInactive: '#64748b',
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
};

export type AppTheme = typeof lightTheme;
