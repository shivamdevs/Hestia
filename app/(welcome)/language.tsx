import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { APP_LANGUAGES_LIST } from "@/lib/i18n/languages";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function LanguagePage() {
	const {
		i18n: i18nInstance,
		t,
	} = useTranslation();

	return (
		<View className="flex-1 p-8">
			<View className="flex-1">
				<Text>
					{t("welcome.language.description")}
				</Text>
				<View className="flex-row flex-wrap flex-1 gap-4 my-10">
					{APP_LANGUAGES_LIST
						.map((lang) => (
							<Button
								variant={i18nInstance.language === lang.code
									? "default"
									: "outline"}
								size="lg"
								className="flex-col items-center justify-center flex-1 min-w-1/3 rounded-2xl"
								key={lang.code}
								onPress={() => {
									i18nInstance.changeLanguage(lang.code);
								}}
							>
								<Text>{lang.name}</Text>
							</Button>
						))}
				</View>
				<Text variant="muted">
					{t("welcome.language.comment")}
				</Text>
			</View>
			<Button
				variant="default"
				size="lg"
				className="mt-8"
				href="./login"
				carryParams
			>
				<Text>
					{t("welcome.language.button")}
				</Text>
			</Button>
		</View>
	);
}
