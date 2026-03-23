import * as SecureStore from "expo-secure-store";

export const Storage = {
	async getItem(key: string): Promise<string | null> {
		try {
			return await SecureStore.getItemAsync(key);
		} catch (error) {
			console.error(`Error reading key "${key}" from SecureStore:`, error);
			return null;
		}
	},

	async setItem(key: string, value: string): Promise<void> {
		try {
			await SecureStore.setItemAsync(key, value);
		} catch (error) {
			console.error(`Error writing key "${key}" to SecureStore:`, error);
		}
	},

	async removeItem(key: string): Promise<void> {
		try {
			await SecureStore.deleteItemAsync(key);
		} catch (error) {
			console.error(`Error removing key "${key}" from SecureStore:`, error);
		}
	},

	async clear(): Promise<void> {
		// SecureStore doesn't have a clear all, but we don't usually need it
		// If we do, we'd have to track keys. For now, we manually manage them.
	},
};
