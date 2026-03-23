import { useSession } from "@/lib/pb";
import { Stack } from "expo-router";
import React from "react";

export default function OnboardingLayout() {
	const { user } = useSession();
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: `Welcome, ${user?.name || "User"}!`,
				}}
			/>
			<Stack.Screen
				name="profile"
				options={{
					title: "Complete your profile",
				}}
			/>
		</Stack>
	);
}
