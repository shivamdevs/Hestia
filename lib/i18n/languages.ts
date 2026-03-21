import { LucideIcon } from "lucide-react-native";
import { i18nResources } from "./index";

export type AppLanguageListItem = {
	icon: LucideIcon | string;
	code: keyof typeof i18nResources;
	name: string;
};

export const APP_LANGUAGES_LIST: AppLanguageListItem[] = [
	{
		icon: "EN",
		code: "en-US",
		name: "English",
	},
	{
		icon: "HI",
		code: "en-IN",
		name: "हिंदी",
	},
];
