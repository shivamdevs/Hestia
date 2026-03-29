import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { SafeView } from "@/components/ui/safe-view";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { useThemeColors } from "@/hooks/use-theme";
import { APP_LANGUAGES_LIST } from "@/lib/i18n/languages";
import { Image } from "expo-image";
import { LucideCheck } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function LanguagePage() {
	const {
		i18n: i18nInstance,
		t,
	} = useTranslation();
	const colors = useThemeColors();

	return (
		<SafeView className="flex-1">
			<View className="flex-1 pt-16">
				<View className="px-8 pb-4">
					<Text
						variant="display"
						className="text-left mb-2 text-3xl"
					>
						{t("welcome.language.title")}
					</Text>
					<Text variant="body" muted>
						{t("welcome.language.description")}
					</Text>
				</View>
				<ScrollArea
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<View className="flex-1 gap-4 px-8 my-10">
						{APP_LANGUAGES_LIST
							.map((lang) => {
								const isActive =
									i18nInstance.language === lang.code;
								return (
									<Card
										key={lang.code}
										className="flex-row items-center gap-4"
										onPress={() => {
											i18nInstance.changeLanguage(
												lang.code,
											);
										}}
										style={isActive
											? {
												borderColor: colors.primary,
												borderWidth: 1.5,
											}
											: {}}
									>
										<View style={styles.iconContainer}>
											<Image
												source={lang.icon}
												cachePolicy="disk"
												contentFit="contain"
												style={styles.icon}
											/>
										</View>
										<View className="flex-1">
											<Text
												variant="title"
												className="text-xl"
												style={isActive
													? { color: colors.primary }
													: {}}
											>
												{lang.title}
											</Text>
											<Text
												variant="body"
												className="text-base"
												muted
											>
												{lang.subtitle}
											</Text>
										</View>
										{isActive && (
											<View
												style={[
													styles.activeIndicator,
													{
														backgroundColor:
															colors.primary,
													},
												]}
											>
												<Icon
													icon={LucideCheck}
													size={14}
													color="white"
												/>
											</View>
										)}
									</Card>
								);
							})}
					</View>
					<Text variant="body" muted className="px-8">
						{t("welcome.language.comment")}
					</Text>
				</ScrollArea>
			</View>
			<Button
				variant="default"
				size="lg"
				className="m-8 mt-4"
				href="./login"
				carryParams
			>
				<Text>
					{t("welcome.language.button")}
				</Text>
			</Button>
		</SafeView>
	);
}

const styles = StyleSheet.create({
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "rgba(0,0,0,0.05)",
		borderColor: "#888",
		borderWidth: 2,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	icon: {
		width: 44,
		height: 44,
	},
	activeIndicator: {
		width: 24,
		height: 24,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
});
