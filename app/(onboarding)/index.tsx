import { Button } from "@/components/ui/button";
import { SafeView } from "@/components/ui/safe-view";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { useThemeColors } from "@/hooks/use-theme";
import { usePushNotificationHandler } from "@/lib/hooks/use-push-notifications";
import { Redirect } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function OnboardingScreen() {
	const {
		isLoading,
		isAllowed,
		isAlreadySet,
		error,
		askForPermission,
	} = usePushNotificationHandler();
	const colors = useThemeColors();
	const { t } = useTranslation();

	if (!isLoading && isAlreadySet) {
		return <Redirect href="./profile" />;
	}

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

	// return (
	// 	<SafeView className="flex-1">
	// 		<ScrollArea
	// 			contentClassName="px-8 pt-24 pb-8 justify-between"
	// 			showsVerticalScrollIndicator={false}
	// 		>
	// 			<View className="gap-8">
	// 				<View
	// 					className="w-32 h-32 rounded-[32px] overflow-hidden items-center justify-center p-6"
	// 					style={{ backgroundColor: colors.surfaceContainerLow }}
	// 				>
	// 					<Image
	// 						source={{
	// 							uri: "https://cdn-icons-png.flaticon.com/512/6302/6302741.png",
	// 						}}
	// 						style={{
	// 							width: "100%",
	// 							height: "100%",
	// 						}}
	// 					/>
	// 				</View>

	// 				<View className="gap-4">
	// 					<Text variant="display" className="text-left">
	// 						Stay in the loop!
	// 					</Text>
	// 					<Text variant="body" muted>
	// 						Notifications help you stay updated with the latest
	// 						alerts and updates.
	// 					</Text>
	// 				</View>
	// 			</View>

	// 			<View className="gap-6 mt-12">
	// 				{error && (
	// 					<Text className="text-center text-red-500">
	// 						{String(error)}
	// 					</Text>
	// 				)}

	// 				{isAllowed
	// 					? (
	// 						<Button
	// 							size="default"
	// 							className="w-full"
	// 							href="./profile"
	// 							replace
	// 							carryParams
	// 						>
	// 							Continue
	// 						</Button>
	// 					)
	// 					: (
	// 						<Button
	// 							onPress={() => askForPermission()}
	// 							disabled={isLoading}
	// 							size="default"
	// 							className="w-full"
	// 						>
	// 							<Icon
	// 								spin={isLoading}
	// 								icon={isLoading
	// 									? LucideLoaderCircle
	// 									: LucideBellRing}
	// 							/>
	// 							<Text>Enable Notifications</Text>
	// 						</Button>
	// 					)}
	// 			</View>
	// 			<Text muted className="text-center">
	// 				<Trans
	// 					i18nKey="onboarding.notification.comment"
	// 					components={{
	// 						strong: <Text className="font-semibold" />,
	// 					}}
	// 				/>
	// 			</Text>
	// 		</ScrollArea>
	// 	</SafeView>
	// );
}
