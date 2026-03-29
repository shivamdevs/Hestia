import { IMAGES } from "@/constants/images";
import { i18nResources } from "./index";

export type AppLanguageListItem = {
	icon: string;
	code: keyof typeof i18nResources;
	title: string;
	subtitle: string;
};

export const APP_LANGUAGES_LIST: AppLanguageListItem[] = [
	{
		icon: IMAGES.languages.enUS,
		code: "en-US",
		title: "English",
		subtitle: "English",
	},
	{
		icon: IMAGES.languages.enIn,
		code: "en-IN",
		title: "Hindi",
		subtitle: "हिंदी",
	},
];
