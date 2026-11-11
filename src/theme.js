import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#047857',
  dark: '#064e3b',
  bg: '#f0fdf4',
  card: '#ffffff',
  text: '#111827',
  muted: '#6b7280',
  border: '#e5e7eb',
};

export const spacing = { sm: 8, md: 16, lg: 24 };

export const common = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: spacing.md },
  title: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: spacing.sm },
  text: { fontSize: 15, color: colors.text, marginBottom: 4 },
  muted: { fontSize: 14, color: colors.muted },
  card: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonOutline: {
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  buttonOutlineText: { color: colors.primary, textAlign: 'center', fontWeight: 'bold' },
});