import {
	Href,
	Redirect,
	useGlobalSearchParams,
	usePathname,
	useSegments,
} from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useSession } from "./use-session";

function normalizeRedirectTarget(value: string | string[] | undefined) {
	const target = Array.isArray(value) ? value[0] : value;
	if (!target) return null;

	if (!target.startsWith("/") || target.startsWith("//")) {
		return null;
	}

	return target;
}

function buildCurrentRouteWithQuery(
	pathname: string,
	params: Record<string, string | string[] | undefined>,
) {
	const query = new URLSearchParams();

	for (const [key, rawValue] of Object.entries(params)) {
		if (key === "redirectTo") {
			continue;
		}

		if (Array.isArray(rawValue)) {
			for (const value of rawValue) {
				if (typeof value === "string" && value.length > 0) {
					query.append(key, value);
				}
			}
			continue;
		}

		if (typeof rawValue === "string" && rawValue.length > 0) {
			query.append(key, rawValue);
		}
	}

	const queryString = query.toString();
	return queryString ? `${pathname}?${queryString}` : pathname;
}

export function SessionGate({ children }: React.PropsWithChildren) {
	const segments = useSegments();
	const pathname = usePathname();
	const searchParams = useGlobalSearchParams();
	const { isReady, isLoggedIn, user } = useSession();

	if (!isReady) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator />
			</View>
		);
	}

	const firstSegment = segments[0];
	const isWelcomeRoute = firstSegment === "(welcome)";
	const isAppRoute = firstSegment === "(app)";
	const isOnboardingRoute = firstSegment === "(onboarding)";
	const isRootRoute = !firstSegment;
	const redirectTo = normalizeRedirectTarget(searchParams.redirectTo);
	const currentRoute = buildCurrentRouteWithQuery(pathname, searchParams);

	if (!isLoggedIn && (isAppRoute || isOnboardingRoute)) {
		return (
			<Redirect
				href={{
					pathname: "/(welcome)/login",
					params: { redirectTo: currentRoute },
				}}
			/>
		);
	}

	if (isLoggedIn) {
		const hasFinishedOnboarding = Boolean(user?.isOnboarded);

		if (!hasFinishedOnboarding && !isOnboardingRoute) {
			// Restrict user from traversing away from onboarding until they complete the required flow
			const nextRedirect = redirectTo || (isAppRoute ? currentRoute : undefined);
			
			return (
				<Redirect 
					href={{
						pathname: "/(onboarding)",
						params: nextRedirect ? { redirectTo: nextRedirect } : undefined
					}} 
				/>
			);
		}

		if (hasFinishedOnboarding && isOnboardingRoute) {
			// They already completed onboarding, send them back to the app!
			if (redirectTo) {
				return <Redirect href={redirectTo as Href} />;
			}
			
			return <Redirect href="/(app)" />;
		}

		if (isWelcomeRoute || isRootRoute) {
			if (redirectTo && hasFinishedOnboarding) {
				return <Redirect href={redirectTo as Href} />;
			}

			return <Redirect href="/(app)" />;
		}
	}

	if (!isLoggedIn && isRootRoute) {
		return <Redirect href="/(welcome)" />;
	}

	return <>{children}</>;
}
