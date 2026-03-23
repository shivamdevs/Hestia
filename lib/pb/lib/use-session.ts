import type { RecordModel } from "pocketbase";
import React from "react";
import { revokePushToken } from "../../notifications";
import { hasHydratedPbAuthStore, hydratePbAuthStore, pb } from "../main";

export type SessionUser = {
	created: Date;
	updated: Date;
	id: string;
	email: string;
	name: string | null;
	verified: boolean;
	emailVisibility: boolean;
	role: "partner" | "user" | null;
	isOnboarded: boolean;
	avatar: string | null;
	_collectionId: string;
	_collectionName: string;
};

export type SessionState = {
	user: SessionUser | null;
	token: string;
	isLoggedIn: boolean;
	isReady: boolean;
	logout: () => Promise<void>;
};

function sanitizeUserRecord(record?: RecordModel | null): SessionUser | null {
	if (!record) return null;

	return {
		created: new Date(record.created),
		updated: new Date(record.updated),
		id: record.id,
		email: record.email,
		name: record.name || null,
		verified: record.verified,
		emailVisibility: record.emailVisibility,
		role: record.role || null,
		isOnboarded: record.isOnboarded || false,
		avatar: record.avatarUrl || record.avatar || null,
		_collectionId: record.collectionId,
		_collectionName: record.collectionName,
	};
}

const SessionContext = React.createContext<SessionState | null>(null);

export function SessionProvider({ children }: React.PropsWithChildren) {
	const [isReady, setIsReady] = React.useState(hasHydratedPbAuthStore());
	const [token, setToken] = React.useState(pb.authStore.token);
	const [user, setUser] = React.useState<SessionUser | null>(
		sanitizeUserRecord(pb.authStore.record as RecordModel),
	);

	React.useEffect(() => {
		let isMounted = true;

		const init = async () => {
			if (!hasHydratedPbAuthStore()) {
				await hydratePbAuthStore();
			}

			if (isMounted) {
				setToken(pb.authStore.token);
				setUser(sanitizeUserRecord(pb.authStore.record as RecordModel));
				setIsReady(true);
			}
		};

		void init();

		const unsubscribe = pb.authStore.onChange((newToken, nextUser) => {
			if (isMounted) {
				setToken(newToken);
				setUser(sanitizeUserRecord(nextUser as RecordModel));
			}
		});

		return () => {
			isMounted = false;
			unsubscribe();
		};
	}, []);

	const logout = React.useCallback(async () => {
		try {
			await revokePushToken();
		} catch (error) {
			console.error("Failed to revoke push token during logout:", error);
		} finally {
			pb.authStore.clear();
		}
	}, []);

	const value = React.useMemo<SessionState>(
		() => ({
			user,
			token,
			isLoggedIn: !!token && !!user,
			isReady,
			logout,
		}),
		[isReady, logout, token, user],
	);

	return React.createElement(SessionContext.Provider, { value }, children);
}

export function useSession(): SessionState {
	const context = React.useContext(SessionContext);
	if (!context) {
		throw new Error("useSession must be used within SessionProvider.");
	}

	return context;
}
