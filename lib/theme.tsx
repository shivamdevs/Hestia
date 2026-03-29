import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

export type AppColorScheme = "light" | "dark";

export const AppColors = {
	light: {
		primary: "#006565",
		primaryContainer: "#008080",
		surface: "#fcf9f8",
		surfaceContainerLow: "#f6f3f2",
		surfaceContainerHighest: "#e5e2e1",
		surfaceContainerLowest: "#ffffff",
		surfaceDim: "#dcd9d9",
		onSurface: "#1c1b1b",
		onSurfaceVariant: "#4a4646",
		outlineVariant: "#1c1b1b26",
		charcoal: "#1A1A1A",
		text: "#1c1b1b",
		background: "#fcf9f8",
		tint: "#006565",
		icon: "#1c1b1b",
		tabIconDefault: "#4a4646",
		tabIconSelected: "#006565",
		link: "#4a90e2",
	},
	dark: {
		primary: "#008080",
		primaryContainer: "#006565",
		surface: "#1A1A1A",
		surfaceContainerLow: "#242424",
		surfaceContainerHighest: "#333333",
		surfaceContainerLowest: "#1c1b1b",
		surfaceDim: "#121212",
		onSurface: "#fcf9f8",
		onSurfaceVariant: "#dcd9d9",
		outlineVariant: "#fcf9f826",
		charcoal: "#1A1A1A",
		text: "#fcf9f8",
		background: "#1A1A1A",
		tint: "#008080",
		icon: "#fcf9f8",
		tabIconDefault: "#dcd9d9",
		tabIconSelected: "#008080",
		link: "#4a90e2",
	},
} as const;

const LightNavigationTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: AppColors.light.primary,
		background: AppColors.light.surface,
		card: AppColors.light.surfaceContainerLow,
		text: AppColors.light.onSurface,
		border: "transparent", // No-Line Rule
		notification: AppColors.light.primary,
	},
};

const DarkNavigationTheme: Theme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		primary: AppColors.dark.primary,
		background: AppColors.dark.surface,
		card: AppColors.dark.surfaceContainerLow,
		text: AppColors.dark.onSurface,
		border: "transparent", // No-Line Rule
		notification: AppColors.dark.primary,
	},
};

export const NavigationThemes = {
	light: LightNavigationTheme,
	dark: DarkNavigationTheme,
} as const;
