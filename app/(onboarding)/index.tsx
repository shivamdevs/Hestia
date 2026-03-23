import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { usePushNotificationHandler } from "@/lib/hooks/use-push-notifications";
import { Image } from "expo-image";
import { Redirect } from "expo-router";
import { LucideBellRing, LucideLoaderCircle } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function OnboardingScreen() {
	const {
		isLoading,
		isAllowed,
		isAlreadySet,
		error,
		askForPermission,
	} = usePushNotificationHandler();

	if (!isLoading && isAlreadySet) {
		return <Redirect href="./profile" />;
	}

	return (
		<View className="flex-1 gap-8 p-8">
			<View className="flex-1 justify-center items-center gap-6">
				<Image
					source={{
						uri: "https://cdn-icons-png.flaticon.com/512/6302/6302741.png",
					}}
					style={{
						width: 128,
						height: 128,
						backgroundColor: "#EFEFEFCE",
						borderRadius: 32,
					}}
				/>
				<Text className="text-3xl font-bold text-center">
					Stay in the loop!
				</Text>
				<Text className="text-lg text-center opacity-60">
					Notifications help you stay updated with the latest alerts
					and updates.
				</Text>
			</View>

			<Text className="text-center text-lg text-emerald-500">
				{isAllowed
					? "Thanks! You're all set."
					: (error ? String(error) : "")}
			</Text>

			{isAllowed
				? (
					<Button
						size="lg"
						className="w-full mt-4"
						href="./profile"
						replace
						carryParams
					>
						<Text>Continue</Text>
					</Button>
				)
				: (
					<Button
						onPress={() => askForPermission()}
						disabled={isLoading}
						size="lg"
						className="w-full mt-4"
					>
						<Icon
							spin={isLoading}
							icon={isLoading
								? LucideLoaderCircle
								: LucideBellRing}
						/>
						<Text>Enable Notifications</Text>
					</Button>
				)}
		</View>
	);
}
