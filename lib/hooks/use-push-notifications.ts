import * as Notifications from "expo-notifications";
import React from "react";
import {
	checkPushPermissions,
	requestPushPermissions,
	syncPushToken,
} from "../notifications";
import { useSession } from "../pb/lib/use-session";

/**
 * A hook to manage push notification tokens and synchronize them
 * selectively with PocketBase when conditions change natively.
 * Mount this at the root app layout to avoid unmount disruptions.
 */
export function usePushNotifications() {
	const { isLoggedIn, isReady } = useSession();

	React.useEffect(() => {
		if (!isReady || !isLoggedIn) return;

		// Trigger sync when session becomes ready and logged in
		void syncPushToken();

		// Listen to token changes globally
		const pushTokenListener = Notifications.addPushTokenListener(() => {
			void syncPushToken();
		});

		return () => {
			pushTokenListener.remove();
		};
	}, [isLoggedIn, isReady]);
}

export function usePushNotificationHandler() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [isAllowed, setIsAllowed] = React.useState<boolean | null>(null);
	const [isAlreadySet, setIsAlreadySet] = React.useState<boolean | null>(
		null,
	);
	const [error, setError] = React.useState<Error | null>(null);

	React.useEffect(() => {
		let isMounted = true;
		const init = async () => {
			const allowed = await checkPushPermissions();
			if (isMounted) {
				setIsAlreadySet(allowed);
			}
			setIsLoading(false);
		};
		void init();
		return () => {
			isMounted = false;
		};
	}, []);

	const askForPermission = React.useCallback(async () => {
		setIsLoading(true);
		setIsAllowed(null);
		setError(null);
		try {
			const allowed = await requestPushPermissions();
			setIsAllowed(allowed);
			if (allowed) {
				await syncPushToken();
			}
		} catch (e) {
			setError(e as Error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		isAllowed,
		isAlreadySet,
		error,
		askForPermission,
	};
}
