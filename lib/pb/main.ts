import { ENV } from "@/constants/env";
import { STORAGE_KEYS } from "@/constants/storage";
import type { RecordModel } from "pocketbase";
import PocketBase, { AsyncAuthStore } from "pocketbase";
import { Storage } from "../storage";

const store = new AsyncAuthStore({
	save: async (serialized) =>
		Storage.setItem(STORAGE_KEYS.USER_TOKEN, serialized),
	clear: async () => Storage.removeItem(STORAGE_KEYS.USER_TOKEN),
});

const pb = new PocketBase(ENV.pocketBaseUrl, store);

pb.autoCancellation(false);

let authHydrationPromise: Promise<void> | null = null;
let isAuthHydrated = false;

export async function hydratePbAuthStore() {
	if (isAuthHydrated) return;

	if (!authHydrationPromise) {
		authHydrationPromise = (async () => {
			const serialized = await Storage.getItem(
				STORAGE_KEYS.USER_TOKEN,
			);
			if (serialized) {
				try {
					const parsed = JSON.parse(serialized) as {
						token?: string;
						record?: unknown;
						model?: unknown;
					};

					pb.authStore.save(
						parsed.token ?? "",
						((parsed.record ?? parsed.model) as
							| RecordModel
							| null) ??
							null,
					);
				} catch {
					pb.authStore.clear();
				}
			}
			isAuthHydrated = true;
		})();
	}

	await authHydrationPromise;
}

export function hasHydratedPbAuthStore() {
	return isAuthHydrated;
}

void hydratePbAuthStore();

export const PB_COLLECTIONS = {
	USERS: "users",
};

export { pb, store as pbAuthStore };
