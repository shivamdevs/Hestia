import {
	Href,
	Redirect,
	useGlobalSearchParams,
	usePathname,
	useSegments,
} from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";
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

import { SafeView } from "@/components/ui/safe-view";
import { useThemeColors } from "@/hooks/use-theme";

export function SessionGate({ children }: React.PropsWithChildren) {
	const segments = useSegments();
	const pathname = usePathname();
	const searchParams = useGlobalSearchParams();
	const { isReady, isLoggedIn, user } = useSession();
	const colors = useThemeColors();

	if (!isReady) {
		return (
			<SafeView className="flex-1 items-center justify-center">
				<ActivityIndicator color={colors.primary} />
			</SafeView>
		);
	}

	const firstSegment = segments[0];
	const isWelcomeRoute = firstSegment === "(welcome)";
	const isAppRoute = firstSegment === "(app)";
	const isOnboardingRoute = firstSegment === "(onboarding)";
	const isRootRoute = !firstSegment || firstSegment as string === "";

	console.log("SessionGate: evaluation", {
		segments,
		isLoggedIn,
		isRootRoute,
		firstSegment,
		isOnboardingRoute,
		isAppRoute,
	});

	const redirectTo = normalizeRedirectTarget(searchParams.redirectTo);
	const currentRoute = buildCurrentRouteWithQuery(pathname, searchParams);

	if (!isLoggedIn && (isAppRoute || isOnboardingRoute)) {
		console.log("SessionGate: redirecting to login", { currentRoute });
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
		console.log("SessionGate: user logged in", { hasFinishedOnboarding });

		if (!hasFinishedOnboarding && !isOnboardingRoute) {
			const nextRedirect = redirectTo ||
				(isAppRoute ? currentRoute : undefined);
			console.log("SessionGate: redirecting to onboarding", {
				nextRedirect,
			});

			return (
				<Redirect
					href={{
						pathname: "/(onboarding)",
						params: nextRedirect
							? { redirectTo: nextRedirect }
							: undefined,
					}}
				/>
			);
		}

		if (hasFinishedOnboarding && isOnboardingRoute) {
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
		console.log("SessionGate: root redirect to welcome");
		return <Redirect href="/(welcome)" />;
	}

	return <>{children}</>;
}
