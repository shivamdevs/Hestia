import { STORAGE_KEYS } from "@/constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEnIn from "./locales/en-IN/translation.json";
import translationEnUs from "./locales/en-US/translation.json";

export const i18nResources = {
	"en-US": { translation: translationEnUs },
	"en-IN": { translation: translationEnIn },
} as const;

const DEFAULT_LANGUAGE: keyof typeof i18nResources = "en-US";

function resolveSupportedLanguage(languageTag?: string | null) {
	if (!languageTag) return DEFAULT_LANGUAGE;

	if (languageTag in i18nResources) {
		return languageTag as keyof typeof i18nResources;
	}

	const baseLanguage = languageTag.split("-")[0]?.toLowerCase();
	if (baseLanguage === "en") return "en-US";

	return DEFAULT_LANGUAGE;
}

const initI18n = async () => {
	let savedLanguage = await AsyncStorage.getItem(STORAGE_KEYS.APP_LANGUAGE);

	if (!savedLanguage) {
		const [locale] = Localization.getLocales();
		savedLanguage = locale?.languageTag ?? DEFAULT_LANGUAGE;
	}

	const language = resolveSupportedLanguage(savedLanguage);

	// eslint-disable-next-line import/no-named-as-default-member
	await i18n.use(initReactI18next).init({
		resources: i18nResources,
		lng: language,
		fallbackLng: DEFAULT_LANGUAGE,
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false,
		},
	});
};

void initI18n();

export default i18n;
