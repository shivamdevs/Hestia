import { Text } from "@/components/ui/text";
import { useSession } from "@/lib/pb";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

export default function OnboardingProfileScreen() {
	const { user } = useSession();

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
		</View>
	);
}
