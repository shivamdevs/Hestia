import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { IMAGES } from "@/constants/images";
import { Image, ImageBackground } from "expo-image";
import React from "react";
import { View } from "react-native";

export default function WelcomePage() {
	return (
		<ImageBackground
			source={IMAGES.backgrounds.blurry_gradient}
			cachePolicy="disk"
			contentFit="cover"
			style={{ flex: 1 }}
		>
			<View className="justify-center flex-1 p-8">
				<View className="items-center justify-center flex-1">
					<Image
						source={IMAGES.icons.icon}
						cachePolicy="disk"
						contentFit="contain"
						style={{
							width: 128,
							height: 128,
							borderRadius: 32,
							marginBottom: 32,
						}}
					/>
					<Text variant="h2" className="font-mono">
						Welcome to Hestia!
					</Text>
					<Text variant="muted" className="text-xl">
						Your daily routine manager.
					</Text>
				</View>
				<Button
					variant="default"
					size="lg"
					className="mt-8"
					href="./language"
				>
					<Text>Get Started</Text>
				</Button>
			</View>
		</ImageBackground>
	);
}
