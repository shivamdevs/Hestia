import { ENV } from "@/constants/env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import { hydratePbAuthStore, pb, PB_COLLECTIONS } from "../main";

let isGoogleConfigured = false;

function ensureGoogleConfigured() {
	if (isGoogleConfigured) return;

	if (!ENV.googleSigninWebClientId) {
		throw new Error(
			"Missing EXPO_PUBLIC_GOOGLE_SIGNIN_WEB_CLIENT_ID. Add it to your environment and rebuild.",
		);
	}

	GoogleSignin.configure({
		webClientId: ENV.googleSigninWebClientId,
	});

	isGoogleConfigured = true;
}

const handleGoogleLogin = async () => {
	try {
		ensureGoogleConfigured();
		await hydratePbAuthStore();

		// 1. Trigger Native Google Login
		await GoogleSignin.hasPlayServices();
		const signInData = await GoogleSignin.signIn();

		if (signInData.type === "success") {
		} else if (signInData.type === "cancelled") {
			throw new Error("Google Sign-In cancelled by user");
		}

		const { idToken } = await GoogleSignin.getTokens();

		const authData = await pb.collection(PB_COLLECTIONS.USERS)
			.authWithOAuth2({
				provider: "google",
				token: idToken,
			});

		console.log("Logged in as:", authData.record.username);
	} catch (error) {
		console.error("Auth Error:", error);
		throw error;
	}
};

export type OAuthProvider = "google";

export type AuthHandler = {
	isLoading: boolean;
	error: string | null;
	oauthLogin: (provider: OAuthProvider) => Promise<void>;
};

export function useAuthHandler(): AuthHandler {
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const oauthLogin = async (provider: OAuthProvider) => {
		setIsLoading(true);
		setError(null);

		try {
			if (provider === "google") {
				await handleGoogleLogin();
			} else {
				throw new Error("Unsupported provider");
			}
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setIsLoading(false);
		}
	};
	return { isLoading, error, oauthLogin };
}
