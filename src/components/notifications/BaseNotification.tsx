interface BaseNotificationProps {
	icon: React.ReactNode;
	title: string | React.ReactNode;
	description: string | React.ReactNode;
	value: bigint | React.ReactNode;
}

function BaseNotification({ icon, title, description, value }: BaseNotificationProps) {
	return (
		<div className="flex items-center gap-2 p-2 justify-between border border-border rounded-lg">
			<div className="flex items-center gap-2">
				{icon}
				<div className="flex flex-col">
					<p className="text-sm font-medium">{title}</p>
					<p className="text-xs text-gray-500">{description}</p>
				</div>
			</div>
			<div className="flex items-center gap-2 mr-2 text-sm">{value}</div>
		</div>
	);
}

export default BaseNotification;
