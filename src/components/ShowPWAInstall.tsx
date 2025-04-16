import { Button, toast } from '@betfinio/components/ui';
import { useEffect, useState } from 'react';

function ShowPWAInstall() {
	const [installPrompt, setInstallPrompt] = useState<any>(null);

	const handleInstall = async () => {
		if (installPrompt) {
			await installPrompt.prompt();
			setInstallPrompt(null);
		}
		toast.dismiss();
	};

	// Effect for handling the beforeinstallprompt event
	useEffect(() => {
		// Check if we already have a stored prompt
		if ((window as any).deferredPrompt) {
			console.log('Found stored install prompt');
			setInstallPrompt((window as any).deferredPrompt);
			(window as any).deferredPrompt = null;
		}

		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			console.log('Captured install prompt event');
			setInstallPrompt(e);
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		};
	}, []);

	// Separate effect for showing the toast
	useEffect(() => {
		if (window.matchMedia('(display-mode: standalone)').matches) {
			console.log('App is installed');
			return;
		}
		if (installPrompt) {
			setTimeout(() => {
				toast(
					<div className="flex flex-col items-center gap-2 justify-between">
						<div className="text-sm flex flex-col">Install the app to get the best experience</div>
						<div className="flex flex-row gap-2 w-full">
							<Button size="freeSize" variant="outline" className="px-2 py-1 w-full" onClick={() => toast.dismiss()}>
								Close
							</Button>
							<Button size="freeSize" className="px-2 py-1 w-full" onClick={handleInstall}>
								Install
							</Button>
						</div>
					</div>,
					{ className: 'w-full', classNames: { content: 'w-full' } },
				);
			}, 500);
		}
	}, [installPrompt]);

	return null;
}

export default ShowPWAInstall;
