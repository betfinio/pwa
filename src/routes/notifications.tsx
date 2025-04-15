import { Button } from '@betfinio/components';

function Notifications() {
	const handleAllowNotifications = () => {
		Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				console.log('notifications allowed');
			}
		});
	};
	return (
		<div>
			<Button onClick={handleAllowNotifications}>Allow notifications</Button>
		</div>
	);
}

export default Notifications;
