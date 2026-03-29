import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { useThemeColors } from "@/hooks/use-theme";
import { useAuthHandler } from "@/lib/pb";
import { Link } from "expo-router";
import { LucideLoaderCircle } from "lucide-react-native";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { View } from "react-native";

export default function LoginPage() {
	const { t } = useTranslation();
	const colors = useThemeColors();

	const {
		isLoading,
		error,
		oauthLogin,
	} = useAuthHandler();

	return (
		<View className="flex-1 pt-24">
			<View className="flex-1">
				<View className="px-8 pb-4">
					<Text
						variant="display"
						className="text-left mb-2 text-3xl"
					>
						{t("welcome.login.title")}
					</Text>
					<Text variant="body" muted>
						{t("welcome.login.description")}
					</Text>
				</View>
				<ScrollArea
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<Card className="p-8 min-h-64 gap-8 mt-auto rounded-b-0">
						<Button
							variant="secondary"
							className="my-auto"
							size="lg"
							onPress={() => oauthLogin("google")}
							disabled={isLoading}
						>
							<Icon
								spin={isLoading}
								icon={isLoading
									? LucideLoaderCircle
									: "https://hestia.dev.shivamdevs.com/_/images/oauth2/google.svg"}
							/>
							<Text>
								{t("welcome.login.oauth.google")}
							</Text>
						</Button>
						<Text variant="destructive">
							{error}
						</Text>
						<Text muted className="text-sm text-center">
							<Trans
								i18nKey="welcome.login.comment"
								components={[
									<Link
										className="underline font-semibold"
										style={{ color: colors.link }}
										// href="/(docs)/terms"
										href="https://hestia.dev.shivamdevs.com/_/docs/terms"
									/>,
									<Link
										className="underline font-semibold"
										style={{ color: colors.link }}
										// href="/(docs)/privacy"
										href="https://hestia.dev.shivamdevs.com/_/docs/privacy"
									/>,
								]}
							/>
						</Text>
					</Card>
				</ScrollArea>
			</View>
		</View>
	);
}
