import { useThemeNavigationColors } from "@/hooks/use-theme";
import "@/lib/i18n";
import { installConsoleInterceptor } from "@/lib/logger";
import { ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "./global.css";

// export const unstable_settings = {
// 	anchor: "(tabs)",
// };

export default function RootLayout() {
	useEffect(() => {
		installConsoleInterceptor();
	}, []);

	const [navigationColors, colorScheme] = useThemeNavigationColors();

	return (
		<ThemeProvider
			value={navigationColors}
		>
			<Slot />
			<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
		</ThemeProvider>
	);
}
