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
import { LoaderIcon, SendIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { type Address, formatEther, isAddress, parseEther, weiUnits } from 'viem';
import { useAccount } from 'wagmi';
import { useBalance as usePolBalance } from 'wagmi';

function SendAction() {
	const { address = ZeroAddress } = useAccount();
	const [to, setTo] = useState<Address | ''>('');
	const [amount, setAmount] = useState('');
	const [currency, setCurrency] = useState<'POL' | 'BET'>('BET');
	const [open, setOpen] = useState(false);

	const { data: polBalance } = usePolBalance({ address });
	const { data: betBalance = 0n } = useBalance(address);
	const { mutateAsync: sendERC20, isPending: isSendingERC20 } = useSendERC20();
	const { mutateAsync: sendNative, isPending: isSendingNative } = useSendNative();

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
				<div className="flex flex-col gap-2 p-4 min-h-[30vh]">
					<AnimatePresence mode="popLayout">
						<motion.div className="flex flex-col gap-2" key="recipient">
							<div className="flex flex-col gap-2">
								<label htmlFor="to" className="text-sm">
									Recipient
								</label>
								<Input value={to} id="to" onChange={(e) => setTo(e.target.value as Address)} placeholder={address} />
							</div>
						</motion.div>
						{isValid && (
							<motion.div
								key="value"
								className="flex flex-col gap-4"
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
							>
								<div className="flex flex-col gap-2">
									<label htmlFor="amount" className="text-sm">
										Amount
									</label>
									<div className="flex items-center gap-2 relative">
										<Select value={currency} onValueChange={handleCurrencyChange}>
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
										<Input value={amount} id="amount" type="number" onChange={(e) => setAmount(e.target.value)} placeholder={'100'} />
										<Badge variant={isMax ? 'default' : 'secondary'} className="absolute bottom-2.5 right-2" onClick={handleSetMax}>
											MAX
										</Badge>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<Button className="w-full gap-1" disabled={!isValid || !amount || isSending} onClick={handleSend}>
										{isSending && <LoaderIcon className="size-4 animate-spin" />}
										{isSending ? 'Sending...' : 'Send'}
									</Button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export default SendAction;
