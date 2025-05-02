import { useAllowance, useBalance, useIncreaseAllowance } from '@/src/lib/query/context';
import { ZeroAddress } from '@betfinio/abi';
import { BetValue } from '@betfinio/components/shared';
import { Button } from '@betfinio/components/ui';
import { Link } from '@tanstack/react-router';
import { ArrowLeftRightIcon, ChevronRightIcon } from 'lucide-react';
import { LoaderIcon } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useBalance as usePolBalance } from 'wagmi';

function BalanceSection() {
	const { address = ZeroAddress } = useAccount();

	const { data: balance = 0n } = useBalance(address);
	const { data: allowance = 0n } = useAllowance(address);
	const { data: polBalance } = usePolBalance({ address });
	const { mutate: increaseAllowance, isPending } = useIncreaseAllowance();
	const handleIncreaseAllowance = () => {
		increaseAllowance();
	};
	// available is min of balance and allowance
	const available = balance > allowance ? allowance : balance;
	return (
		<div className="flex flex-col gap-4 justify-between items-center border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
			<div className="flex flex-row gap-2 justify-between items-center w-full">
				<div className="text-muted-foreground">Wallet balance</div>
				<BetValue value={balance} withIcon withMillify className="font-semibold" precision={3} />
			</div>
			<div className="flex flex-row gap-2 justify-between items-center w-full">
				<div className="text-muted-foreground">Available balance</div>
				<BetValue value={available} withIcon withMillify className="font-semibold" precision={3} />
			</div>
			<div className="flex flex-row gap-2 justify-between items-center w-full">
				<div className="text-muted-foreground">POL balance</div>
				<div className="flex flex-row gap-1 items-center">
					<BetValue value={polBalance?.value ?? 0n} postfix="POL" withMillify className="font-semibold" precision={3} />
					POL
				</div>
			</div>
			<Link to="/balance" className="flex flex-row gap-2 justify-between items-center w-full">
				<div className="text-muted-foreground">Other tokens</div>
				<div className="flex flex-row gap-1 items-center">
					<ChevronRightIcon className="size-4" />
				</div>
			</Link>
			<div className="flex flex-row items-end justify-end w-full">
				<Button className="gap-2" variant="outline" onClick={handleIncreaseAllowance} disabled={isPending}>
					{isPending ? <LoaderIcon className="size-4 animate-spin" /> : <ArrowLeftRightIcon className="size-4" />}
					Adjust spending limit
				</Button>
			</div>
		</div>
	);
}

export default BalanceSection;
