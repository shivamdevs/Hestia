import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

export type AppColorScheme = "light" | "dark";

export const AppColors = {
	light: {
		text: "#11181C",
		background: "#FFFFFF",
		tint: "#0A7EA4",
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: "#0A7EA4",
	},
	dark: {
		text: "#ECEDEE",
		background: "#151718",
		tint: "#FFFFFF",
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: "#FFFFFF",
	},
} as const;

const LightNavigationTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: AppColors.light.tint,
		background: AppColors.light.background,
		card: AppColors.light.background,
		text: AppColors.light.text,
		border: "#D6D6D6",
		notification: AppColors.light.tint,
	},
};

const DarkNavigationTheme: Theme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		primary: AppColors.dark.tint,
		background: AppColors.dark.background,
		card: AppColors.dark.background,
		text: AppColors.dark.text,
		border: "#2C2C2E",
		notification: AppColors.dark.tint,
	},
};

export const NavigationThemes = {
	light: LightNavigationTheme,
	dark: DarkNavigationTheme,
} as const;
