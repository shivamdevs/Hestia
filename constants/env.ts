import Constants from "expo-constants";

type RuntimeConfig = {
	EXPO_PUBLIC_POCKET_BASE_URL?: string;
	EXPO_PUBLIC_GOOGLE_SIGNIN_WEB_CLIENT_ID?: string;
};

function readRuntimeConfig(): RuntimeConfig {
	const extra = (Constants.expoConfig?.extra ?? {}) as RuntimeConfig;

	return {
		...extra,
		EXPO_PUBLIC_POCKET_BASE_URL: process.env.EXPO_PUBLIC_POCKET_BASE_URL ??
			extra.EXPO_PUBLIC_POCKET_BASE_URL,
	};
}

const runtimeConfig = readRuntimeConfig();

export const ENV = {
	pocketbaseUrl: runtimeConfig.EXPO_PUBLIC_POCKET_BASE_URL ??
		"",
	googleSigninWebClientId:
		runtimeConfig.EXPO_PUBLIC_GOOGLE_SIGNIN_WEB_CLIENT_ID ??
			"",
};

export const envFlags = {
	hasPocketBaseUrl: Boolean(ENV.pocketbaseUrl),
	hasGoogleSigninWebClientId: Boolean(ENV.googleSigninWebClientId),
};
