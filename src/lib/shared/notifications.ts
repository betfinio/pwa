/**
 * Utility functions for handling browser notifications
 */

/**
 * Check if the browser supports notifications
 */
export function isNotificationsSupported(): boolean {
	return 'Notification' in window;
}

/**
 * Get the current notification permission status
 * @returns The current notification permission or null if notifications are not supported
 */
export function getNotificationPermission(): NotificationPermission | null {
	if (!isNotificationsSupported()) return null;
	return Notification.permission;
}

/**
 * Check if notifications are currently enabled (permission is granted)
 * @returns True if notifications are enabled, false otherwise
 */
export function isNotificationsEnabled(): boolean {
	return getNotificationPermission() === 'granted';
}

/**
 * Request notification permission from the user
 * @returns A promise that resolves to the new permission status
 */
export async function requestNotificationPermission(): Promise<NotificationPermission | null> {
	// Check if notifications are supported
	if (!isNotificationsSupported()) return null;

	// If permission is already granted or denied, return current status
	if (Notification.permission === 'granted' || Notification.permission === 'denied') {
		return Notification.permission;
	}

	try {
		// Request permission
		const permission = await Notification.requestPermission();
		return permission;
	} catch (error) {
		console.error('Error requesting notification permission:', error);
		return null;
	}
}
