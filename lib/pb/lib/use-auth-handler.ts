import { ENV } from "@/constants/env";
import {
	GoogleSignin,
	isCancelledResponse,
	isErrorWithCode,
	isSuccessResponse,
	statusCodes,
} from "@react-native-google-signin/google-signin";
import React from "react";
import { hydratePbAuthStore, pb } from "../main";
import { formatAuthError } from "./formatter";

export type OAuthProvider = "google";

let isGoogleSigninConfigured = false;

function ensureGoogleSigninConfigured() {
	if (isGoogleSigninConfigured) {
		return;
	}

	if (!ENV.googleSigninWebClientId) {
		throw new Error(
			"Missing EXPO_PUBLIC_GOOGLE_SIGNIN_WEB_CLIENT_ID. Set it to your Google OAuth Web Client ID.",
		);
	}

	if (!ENV.backendUrl) {
		throw new Error(
			"Missing EXPO_PUBLIC_BACKEND_URL. Set it to your Hestia backend base URL.",
		);
	}

	GoogleSignin.configure({
		webClientId: ENV.googleSigninWebClientId,
		offlineAccess: true,
	});

	isGoogleSigninConfigured = true;
}

const handleGoogleLogin = async () => {
	try {
		await hydratePbAuthStore();
		ensureGoogleSigninConfigured();

		const signInResponse = await GoogleSignin.signIn();

		if (isCancelledResponse(signInResponse)) {
			throw new Error("Google sign-in was cancelled.");
		}

		if (!isSuccessResponse(signInResponse)) {
			throw new Error("Google sign-in failed to complete.");
		}

		const serverAuthCode = signInResponse.data.serverAuthCode;
		let idToken = signInResponse.data.idToken;

		if (!idToken) {
			const tokens = await GoogleSignin.getTokens();
			idToken = tokens.idToken;
		}

		if (!idToken) {
			throw new Error("Google sign-in did not provide an idToken.");
		}

		const provider: OAuthProvider = "google";

		const response = await fetch(
			`${ENV.backendUrl}/auth/native/${provider}`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					idToken,
					serverAuthCode,
				}),
			},
		);

		const authData = await response.json() as {
			token: string;
			record: {
				id: string;
				collectionId: string;
				collectionName: string;
				email?: string;
				name?: string;
				[key: string]: unknown;
			};
			error?: string;
		};

		if (!response.ok) {
			throw new Error(
				authData.error ??
					"Backend native Google authentication failed.",
			);
		}

		pb.authStore.save(authData.token, authData.record);

		const userIdentifier = authData.record.email ?? authData.record.id ??
			authData.record.name ?? "(unknown user)";
		console.log("Logged in as:", userIdentifier);
	} catch (error) {
		if (
			isErrorWithCode(error) &&
			error.code === statusCodes.SIGN_IN_CANCELLED
		) {
			throw new Error("Google sign-in was cancelled.");
		}

		console.error("Auth Error:", {
			error,
			originalError: (error as { originalError?: unknown })
				?.originalError,
			response: (error as { response?: unknown })?.response,
		});

		throw new Error(formatAuthError(error));
	}
};

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
				throw new Error(`Unsupported OAuth provider: ${provider}`);
			}
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setIsLoading(false);
		}
	};
	return { isLoading, error, oauthLogin };
}
