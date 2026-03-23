import Constants from "expo-constants";

type RuntimeConfig = {
	EXPO_PUBLIC_POCKET_BASE_URL?: string;
	EXPO_PUBLIC_GOOGLE_SIGNIN_WEB_CLIENT_ID?: string;
	EXPO_PUBLIC_BACKEND_URL?: string;
};

function readRuntimeConfig(): RuntimeConfig {
	const extra = (Constants.expoConfig?.extra ?? {}) as RuntimeConfig;

	return {
		...extra,
		EXPO_PUBLIC_POCKET_BASE_URL: process.env.EXPO_PUBLIC_POCKET_BASE_URL ??
			extra.EXPO_PUBLIC_POCKET_BASE_URL,
		EXPO_PUBLIC_GOOGLE_SIGNIN_WEB_CLIENT_ID:
			process.env.EXPO_PUBLIC_GOOGLE_SIGNIN_WEB_CLIENT_ID ??
				extra.EXPO_PUBLIC_GOOGLE_SIGNIN_WEB_CLIENT_ID,
		EXPO_PUBLIC_BACKEND_URL: process.env.EXPO_PUBLIC_BACKEND_URL ??
			extra.EXPO_PUBLIC_BACKEND_URL,
	};
}

const runtimeConfig = readRuntimeConfig();

export const ENV = {
	pocketBaseUrl: runtimeConfig.EXPO_PUBLIC_POCKET_BASE_URL ??
		"",
	googleSigninWebClientId:
		runtimeConfig.EXPO_PUBLIC_GOOGLE_SIGNIN_WEB_CLIENT_ID ??
			"",
	backendUrl: runtimeConfig.EXPO_PUBLIC_BACKEND_URL ?? "",
};

export const envFlags = {
	hasPocketBaseUrl: Boolean(ENV.pocketBaseUrl),
	hasGoogleSigninWebClientId: Boolean(ENV.googleSigninWebClientId),
	hasBackendUrl: Boolean(ENV.backendUrl),
};
