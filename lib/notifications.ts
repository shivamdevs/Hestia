import { STORAGE_KEYS } from "@/constants/storage";
import * as Crypto from "expo-crypto";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { pb } from "./pb/main";
import { Storage } from "./storage";

export async function getDeviceId(): Promise<string> {
	let deviceId = await Storage.getItem(STORAGE_KEYS.PUSH_DEVICE_ID);
	if (!deviceId) {
		deviceId = Crypto.randomUUID();
		await Storage.setItem(STORAGE_KEYS.PUSH_DEVICE_ID, deviceId);
	}
	return deviceId;
}

export async function checkPushPermissions(): Promise<boolean> {
	if (!Device.isDevice) return false;
	const { status } = await Notifications.getPermissionsAsync();
	return status === "granted";
}

export async function requestPushPermissions(): Promise<boolean> {
	if (!Device.isDevice) {
		console.warn("Push notifications require a physical device.");
		return false;
	}

	const { status: existingStatus } = await Notifications
		.getPermissionsAsync();
	let finalStatus = existingStatus;

	if (existingStatus !== "granted") {
		const { status } = await Notifications.requestPermissionsAsync();
		finalStatus = status;
	}

	return finalStatus === "granted";
}

let isSyncing = false;
let lastSyncedData = "";

export async function syncPushToken() {
	if (!pb.authStore.record?.id) return;
	if (isSyncing) return;

	try {
		isSyncing = true;
		if (!Device.isDevice) return;

		const { status } = await Notifications.getPermissionsAsync();
		if (status !== "granted") return;

		// Get raw device token for APNs or FCM
		const tokenData = await Notifications.getDevicePushTokenAsync();

		let provider = "webpush";
		if (tokenData.type === "android") provider = "fcm";
		else if (tokenData.type === "ios") provider = "apns";

		const deviceId = await getDeviceId();
		const userId = pb.authStore.record.id;

		// Skip if we already synced this exact data recently (optional but good for efficiency)
		const syncKey = `${deviceId}:${userId}:${tokenData.data}:${provider}`;
		if (lastSyncedData === syncKey) {
			// Still check if we need to update lastSeen, but maybe less frequently?
			// For now, let's just return if everything matches to avoid loops.
			return;
		}

		const list = await pb.collection("user_devices").getList(1, 1, {
			filter: pb.filter("deviceId = {:deviceId} && user = {:userId}", {
				deviceId,
				userId,
			}),
		});

		const now = new Date().toISOString();

		if (list.items.length > 0) {
			const existing = list.items[0];

			// Only update if something changed
			if (
				existing.pushToken !== tokenData.data ||
				existing.pushRevoked ||
				existing.user !== userId ||
				existing.pushProvider !== provider
			) {
				await pb.collection("user_devices").update(existing.id, {
					user: userId,
					pushToken: tokenData.data,
					pushProvider: provider,
					pushRevoked: "", // Clear revocation
					lastSeen: now,
				});
			} else {
				// Just update lastSeen if nothing else changed
				await pb.collection("user_devices").update(existing.id, {
					lastSeen: now,
				});
			}
		} else {
			try {
				await pb.collection("user_devices").create({
					deviceId: deviceId,
					user: userId,
					pushProvider: provider,
					pushToken: tokenData.data,
					lastSeen: now,
				});
			} catch (createError: any) {
				// If creation failed but finding by deviceId also returned nothing,
				// it's almost certainly a PocketBase API Rule restriction on LIST.
				if (
					createError.status === 400 &&
					createError.data?.data?.deviceId?.code ===
						"validation_not_unique"
				) {
					console.error(
						"Failed to sync push token: Device record exists but is hidden by LIST rules. Please check PocketBase 'user_devices' collection Rules.",
					);
				}
				throw createError;
			}
		}

		lastSyncedData = syncKey;
	} catch (e) {
		console.warn("Failed to sync push token:", e);
	} finally {
		isSyncing = false;
	}
}

export async function revokePushToken() {
	if (!pb.authStore.record?.id) return;

	try {
		const deviceId = await getDeviceId();
		const userId = pb.authStore.record.id;

		const list = await pb.collection("user_devices").getList(1, 1, {
			filter: pb.filter("deviceId = {:deviceId} && user = {:userId}", {
				deviceId,
				userId,
			}),
		});

		if (list.items.length > 0) {
			const existing = list.items[0];
			await pb.collection("user_devices").update(existing.id, {
				pushRevoked: new Date().toISOString(),
			});
		}
	} catch (e) {
		console.warn("Failed to revoke push token:", e);
	}
}
