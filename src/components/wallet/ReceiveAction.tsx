import { ZeroAddress } from '@betfinio/abi';
import { DrawerDescription } from '@betfinio/components/ui';
import { DrawerTitle } from '@betfinio/components/ui';
import { DrawerTrigger } from '@betfinio/components/ui';
import { Drawer } from '@betfinio/components/ui';
import { Button } from '@betfinio/components/ui';
import { DrawerContent } from '@betfinio/components/ui';
import { DrawerHeader } from '@betfinio/components/ui';
import { CopyIcon, QrCodeIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { QRCode } from 'react-qrcode-logo';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';

function ReceiveAction() {
	const { address = ZeroAddress } = useAccount();
	const handleCopyAddress = () => {
		navigator.clipboard.writeText(address);
		toast.success('Address copied to clipboard');
	};
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div className="flex flex-col items-center gap-2 w-full">
					<motion.div whileTap={{ scale: 0.95 }} className="border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
						<QrCodeIcon className="size-6 text-primary" />
					</motion.div>
					<div className="text-sm">Receive</div>
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Receive</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className="flex flex-col gap-2 items-center justify-center p-4 min-h-[50vh]">
					<QRCode
						value={address}
						qrStyle="dots"
						eyeRadius={{ inner: 2, outer: 20 }}
						size={200}
						quietZone={10}
						logoImage="https://betfin.io/favicon.svg"
						removeQrCodeBehindLogo={true}
						logoPadding={5}
						style={{ borderRadius: '20px' }}
					/>
					<div className="text-sm text-muted-foreground">Scan the QR code to receive POL or BET</div>
					<div className="text-center break-all text-xs">{address}</div>
					<Button variant="ghost" className="w-full gap-2 text-primary" onClick={handleCopyAddress}>
						<CopyIcon className="size-4 text-primary" />
						Copy address
					</Button>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export default ReceiveAction;
