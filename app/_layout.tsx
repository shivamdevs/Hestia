import { useThemeNavigationColors } from "@/hooks/use-theme";
import "@/lib/i18n";
import { installConsoleInterceptor } from "@/lib/logger";
import { SessionGate, SessionProvider } from "@/lib/pb";
import { ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "./global.css";

import { usePushNotifications } from "@/lib/hooks/use-push-notifications";
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
	Manrope_400Regular,
	Manrope_500Medium,
	Manrope_600SemiBold,
	Manrope_700Bold,
	useFonts,
} from "@expo-google-fonts/manrope";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

function LayoutContent() {
	usePushNotifications();
	return <Slot />;
}

export default function RootLayout() {
	const [loaded, error] = useFonts({
		"Manrope-Regular": Manrope_400Regular,
		"Manrope-Medium": Manrope_500Medium,
		"Manrope-SemiBold": Manrope_600SemiBold,
		"Manrope-Bold": Manrope_700Bold,
		"Inter-Regular": Inter_400Regular,
		"Inter-Medium": Inter_500Medium,
		"Inter-SemiBold": Inter_600SemiBold,
	});

	console.log("RootLayout: rendered", { loaded, error });

	useEffect(() => {
		installConsoleInterceptor();
		// Force hide splash screen after 3 seconds as a safety fallback
		const timeout = setTimeout(() => {
			SplashScreen.hideAsync().catch(console.error);
			console.log("RootLayout: splash hide timeout");
		}, 3000);
		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		if (loaded || error) {
			console.log("RootLayout: hiding splash", { loaded, error });
			SplashScreen.hideAsync().catch(console.error);
		}
	}, [loaded, error]);

	const [navigationColors, colorScheme] = useThemeNavigationColors();
	console.log("RootLayout: scheme", colorScheme);

	return (
		<SafeAreaProvider>
			<ThemeProvider value={navigationColors}>
				<SessionProvider>
					<SessionGate>
						<LayoutContent />
					</SessionGate>
				</SessionProvider>
				<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
