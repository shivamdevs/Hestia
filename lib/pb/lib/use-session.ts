import type { RecordModel } from "pocketbase";
import React from "react";
import { hasHydratedPbAuthStore, hydratePbAuthStore, pb } from "../main";

export type SessionState = {
	user: RecordModel | null;
	token: string;
	isLoggedIn: boolean;
	isReady: boolean;
	logout: () => void;
};

export function useSession(): SessionState {
	const [isReady, setIsReady] = React.useState(hasHydratedPbAuthStore());
	const [token, setToken] = React.useState(pb.authStore.token ?? "");
	const [user, setUser] = React.useState<RecordModel | null>(
		(pb.authStore.record as RecordModel | null) ?? null,
	);

	React.useEffect(() => {
		let isMounted = true;

		void hydratePbAuthStore().finally(() => {
			if (!isMounted) return;
			setToken(pb.authStore.token ?? "");
			setUser((pb.authStore.record as RecordModel | null) ?? null);
			setIsReady(true);
		});

		const unsubscribe = pb.authStore.onChange((nextToken, nextUser) => {
			if (!isMounted) return;
			setToken(nextToken ?? "");
			setUser((nextUser as RecordModel | null) ?? null);
		});

		return () => {
			isMounted = false;
			unsubscribe();
		};
	}, []);

	const logout = React.useCallback(() => {
		pb.authStore.clear();
	}, []);

	return {
		user,
		token,
		isLoggedIn: pb.authStore.isValid,
		isReady,
		logout,
	};
}
