import { ENV } from "@/constants/env";
import { STORAGE_KEYS } from "@/constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PocketBase, { AsyncAuthStore } from "pocketbase";

const store = new AsyncAuthStore({
	save: async (serialized) =>
		AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, serialized),
	clear: async () => AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN),
});

const pb = new PocketBase(ENV.pocketbaseUrl, store);

pb.autoCancellation(false);

let authHydrationPromise: Promise<void> | null = null;
let isAuthHydrated = false;

export async function hydratePbAuthStore() {
	if (isAuthHydrated) return;

	if (!authHydrationPromise) {
		authHydrationPromise = (async () => {
			const serialized = await AsyncStorage.getItem(
				STORAGE_KEYS.USER_TOKEN,
			);
			if (serialized) {
				pb.authStore.save(serialized);
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
