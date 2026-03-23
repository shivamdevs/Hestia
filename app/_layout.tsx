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

function LayoutContent() {
	usePushNotifications();
	return <Slot />;
}

export default function RootLayout() {
	useEffect(() => {
		installConsoleInterceptor();
	}, []);

	const [navigationColors, colorScheme] = useThemeNavigationColors();

	return (
		<ThemeProvider value={navigationColors}>
			<SessionProvider>
				<SessionGate>
					<LayoutContent />
				</SessionGate>
			</SessionProvider>
			<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
		</ThemeProvider>
	);
}
