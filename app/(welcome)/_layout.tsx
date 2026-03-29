import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function WelcomeLayout() {
	const { t } = useTranslation();

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="language"
				options={{
					headerTitle: "",
					headerTransparent: true,
				}}
			/>
			<Stack.Screen
				name="login"
				options={{
					headerTitle: "",
					headerTransparent: true,
				}}
			/>
		</Stack>
	);
}
