import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useAuthHandler } from "@/lib/pb";
import { LucideLoaderCircle } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function LoginPage() {
	const { t } = useTranslation();

	const {
		isLoading,
		error,
		oauthLogin,
	} = useAuthHandler();

	return (
		<View className="flex-1 p-8">
			<View className="items-center justify-center flex-1">
				<Text>
					A carousel will be here soon!
				</Text>
			</View>
			{error && (
				<Text variant="destructive">
					{error}
				</Text>
			)}
			<Button
				variant="secondary"
				size="lg"
				className="mt-8"
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
		</View>
	);
}
