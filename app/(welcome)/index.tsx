import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { SafeView } from "@/components/ui/safe-view";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { IMAGES } from "@/constants/images";
import { useThemeColors } from "@/hooks/use-theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { LucideArrowRight } from "lucide-react-native";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function WelcomePage() {
	const colors = useThemeColors();

	const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.50;
	const GRADIENT_HEIGHT = 200;

	return (
		<SafeView style={{ backgroundColor: colors.surface }}>
			{/* Fixed Background Image */}
			<View style={[styles.imageBackground, { height: IMAGE_HEIGHT }]}>
				<Image
					source={IMAGES.generals.welcome}
					contentFit="cover"
					cachePolicy="disk"
					style={StyleSheet.absoluteFill}
				/>
			</View>

			{/* Scrollable Content */}
			<ScrollArea
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: "transparent" }}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				{/* Spacer to let image show through */}
				<View style={{ height: IMAGE_HEIGHT - GRADIENT_HEIGHT }} />

				{/* Fade Section */}
				<LinearGradient
					colors={["transparent", colors.surface]}
					style={{ height: GRADIENT_HEIGHT, width: "100%" }}
					locations={[0, 0.8]}
				/>

				{/* Content Section */}
				<View
					style={[styles.contentBody, {
						backgroundColor: colors.surface,
					}]}
				>
					<View className="gap-2 px-8">
						<Text variant="display" className="text-left">
							Your Home,
						</Text>
						<Text
							variant="display"
							className="text-left italic font-light"
							style={{ color: colors.primary }}
						>
							Perfectly,
						</Text>
						<Text variant="display" className="text-left">
							Managed.
						</Text>
						<Text variant="body" muted className="mt-6">
							Professional help at your fingertips. Discover a new
							standard in residential management and bespoke
							services.
						</Text>
					</View>

					<View className="justify-center px-8 mt-auto pt-12 pb-8">
						<Button
							size="lg"
							href="./language"
							carryParams
							className="w-full"
						>
							<Text>Get Started</Text>
							<Icon icon={LucideArrowRight} />
						</Button>
					</View>
				</View>
			</ScrollArea>
		</SafeView>
	);
}

const styles = StyleSheet.create({
	imageBackground: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 0,
	},
	contentBody: {
		flex: 1,
	},
});
