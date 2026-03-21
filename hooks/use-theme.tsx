import { AppColors, AppColorScheme, NavigationThemes } from "@/lib/theme";
import { useColorScheme } from "react-native";

export function useThemeColorScheme(): AppColorScheme {
	const scheme = useColorScheme();
	return scheme === "dark" ? "dark" : "light";
}

export function useThemeColors() {
	const scheme = useThemeColorScheme();
	return AppColors[scheme];
}

export function useThemeDark(): boolean {
	const scheme = useThemeColorScheme();
	return scheme === "dark";
}

export function useThemeNavigationColors(): [
	typeof NavigationThemes["light"],
	AppColorScheme,
] {
	const scheme = useThemeColorScheme();
	return [NavigationThemes[scheme], scheme === "dark" ? "dark" : "light"];
}
