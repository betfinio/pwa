import { useBalance } from '@/src/lib/query/context';
import { useSendNative } from '@/src/lib/query/wallet';
import { useSendERC20 } from '@/src/lib/query/wallet';
import { ZeroAddress } from '@betfinio/abi';
import { BetLogo, Polygon } from '@betfinio/components/icons';
import { Badge, DrawerDescription, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@betfinio/components/ui';
import { DrawerTitle } from '@betfinio/components/ui';
import { DrawerTrigger } from '@betfinio/components/ui';
import { Drawer } from '@betfinio/components/ui';
import { Button } from '@betfinio/components/ui';
import { DrawerContent } from '@betfinio/components/ui';
import { DrawerHeader } from '@betfinio/components/ui';
import jsQR from 'jsqr';
import { LoaderIcon, QrCodeIcon, SendIcon, XCircleIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { type Address, formatEther, isAddress, parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { useBalance as usePolBalance } from 'wagmi';

const QRScanner = ({ webcamRef }: { webcamRef: React.RefObject<Webcam | null> }) => (
	<motion.div key="qr" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
		<div className="relative w-full overflow-hidden">
			<Webcam
				ref={webcamRef}
				videoConstraints={{ facingMode: 'environment', frameRate: 60 }}
				audio={false}
				screenshotFormat="image/png"
				className="w-full aspect-square object-cover border border-border rounded-xl"
			/>
		</div>
	</motion.div>
);

type RecipientInputProps = {
	to: Address | '';
	onChange: (value: Address | '') => void;
	onScanClick: () => void;
	placeholder: string;
};
const RecipientInput = ({ to, onChange, onScanClick, placeholder }: RecipientInputProps) => (
	<div className="flex flex-col gap-2">
		<label htmlFor="to" className="text-sm">
			Recipient
		</label>
		<div className="flex flex-row items-center gap-2">
			<Input value={to} id="to" onChange={(e) => onChange(e.target.value as Address)} placeholder={placeholder} />
			<div className="flex items-center cursor-pointer" onClick={onScanClick}>
				<QrCodeIcon className="size-8 text-primary" />
			</div>
		</div>
	</div>
);

type AmountSelectorProps = {
	currency: 'BET' | 'POL';
	amount: string;
	onCurrencyChange: (value: 'BET' | 'POL') => void;
	onAmountChange: (value: string) => void;
	onSetMax: () => void;
	isMax: boolean;
};
const AmountSelector = ({ currency, amount, onCurrencyChange, onAmountChange, onSetMax, isMax }: AmountSelectorProps) => (
	<div className="flex flex-col gap-2">
		<label htmlFor="amount" className="text-sm">
			Amount
		</label>
		<div className="flex items-center gap-2 relative">
			<Select value={currency} onValueChange={(v) => onCurrencyChange(v as 'BET' | 'POL')}>
				<SelectTrigger className="w-24 border-foreground">
					<SelectValue placeholder="Select a currency" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="BET">
						<div className="flex items-center gap-1">
							<BetLogo className="size-3.5" />
							<span>BET</span>
						</div>
					</SelectItem>
					<SelectItem value="POL">
						<div className="flex items-center gap-1">
							<Polygon className="size-3.5" />
							<span>POL</span>
						</div>
					</SelectItem>
				</SelectContent>
			</Select>
			<Input value={amount} id="amount" type="number" onChange={(e) => onAmountChange(e.target.value)} placeholder="100" />
			<Badge variant={isMax ? 'default' : 'secondary'} className="absolute bottom-2.5 right-2" onClick={onSetMax}>
				MAX
			</Badge>
		</div>
	</div>
);

function SendAction() {
	const { address = ZeroAddress } = useAccount();
	const [to, setTo] = useState<Address | ''>('');
	const [amount, setAmount] = useState('');
	const [currency, setCurrency] = useState<'POL' | 'BET'>('BET');
	const [open, setOpen] = useState(false);
	const [scanQR, setScanQR] = useState(false);
	const webcamRef = useRef<Webcam | null>(null);

	const { data: polBalance } = usePolBalance({ address });
	const { data: betBalance = 0n } = useBalance(address);
	const { mutateAsync: sendERC20, isPending: isSendingERC20 } = useSendERC20();
	const { mutateAsync: sendNative, isPending: isSendingNative } = useSendNative();

	useEffect(() => {
		const interval = setInterval(captureAndScan, 500); // Scan every 500ms
		return () => clearInterval(interval);
	}, []);

	const captureAndScan = () => {
		if (!webcamRef.current) return;

		const imageSrc = webcamRef.current.getScreenshot();

		if (imageSrc) {
			const image = new Image();
			image.src = imageSrc;

			image.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = image.width;
				canvas.height = image.height;

				const ctx = canvas.getContext('2d');
				if (ctx) {
					ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
					const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

					if (qrCode) {
						setTo(qrCode.data as Address); // Display QR code data
						setScanQR(false);
					}
				}
			};
		}
	};

	const isValid = useMemo(() => {
		// return true;
		return isAddress(to, { strict: false });
	}, [to]);

	const handleCurrencyChange = (value: string) => {
		setCurrency(value as 'POL' | 'BET');
	};

	const handleSend = async () => {
		if (!isValid) return;
		if (currency === 'BET') {
			await sendERC20({ to: to as Address, amount: value });
		} else {
			await sendNative({ to: to as Address, amount: value, isMax: isMax });
		}
		setOpen(false);
	};

	const isSending = isSendingERC20 || isSendingNative;

	const value = useMemo(() => {
		if (currency === 'BET') {
			return parseEther(amount);
		}
		return parseEther(amount);
	}, [currency, amount]);

	const isMax = useMemo(() => {
		if (currency === 'BET') {
			return value > betBalance;
		}
		return value >= (polBalance?.value ?? 0n);
	}, [currency, value, betBalance, polBalance]);

	const handleScanQR = () => {
		setScanQR(true);
	};

	const handleSetMax = () => {
		if (currency === 'BET') {
			setAmount(formatEther(betBalance));
		} else {
			setAmount(formatEther(polBalance?.value ?? 0n));
		}
	};

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<div className="flex flex-col items-center gap-2 w-full">
					<motion.div whileTap={{ scale: 0.95 }} className="border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
						<SendIcon className="size-6 text-primary" />
					</motion.div>
					<div className="text-sm">Send</div>
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="pb-0">
					<DrawerTitle>Send</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className="flex flex-col gap-2 p-4">
					<AnimatePresence mode="sync">
						{!scanQR && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								className="flex flex-col gap-2"
								key="recipient"
							>
								<RecipientInput to={to} onChange={setTo} onScanClick={handleScanQR} placeholder={address} />
							</motion.div>
						)}
						{scanQR && <QRScanner webcamRef={webcamRef} />}
						{!scanQR && (
							<motion.div
								key="value"
								className="flex flex-col gap-4"
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
							>
								<AmountSelector
									currency={currency}
									amount={amount}
									onCurrencyChange={handleCurrencyChange}
									onAmountChange={setAmount}
									onSetMax={handleSetMax}
									isMax={isMax}
								/>
								<div className="flex flex-col gap-2">
									<Button className="w-full gap-1" disabled={!isValid || !amount || isSending} onClick={handleSend}>
										{isSending && <LoaderIcon className="size-4 animate-spin" />}
										{isSending ? 'Sending...' : 'Send'}
									</Button>
								</div>
							</motion.div>
						)}
						{scanQR && (
							<motion.div key="cancel" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
								<Button className="w-full gap-1" onClick={() => setScanQR(false)}>
									<XCircleIcon className="size-4" />
									Cancel
								</Button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export default SendAction;
