import { useMintPass } from '@/src/lib/query/context';
import { ZeroAddress } from '@betfinio/abi';
import { Input } from '@betfinio/components/ui';
import { Button, DrawerDescription, DrawerHeader, DrawerTitle } from '@betfinio/components/ui';
import { DrawerTrigger } from '@betfinio/components/ui';
import { Drawer } from '@betfinio/components/ui';
import { DrawerContent } from '@betfinio/components/ui';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';
import { useAccount } from 'wagmi';

function MemberWarning() {
	const { address = ZeroAddress } = useAccount();
	const [code, setCode] = useState<string>('');
	const { mutate: mintPass, isPending } = useMintPass();
	const handleMintPass = () => {
		mintPass({ address, ref: code });
	};
	return (
		<div className="flex flex-row gap-2 justify-between items-center border border-destructive rounded-xl p-4 bg-background-lighter cursor-pointer">
			<div className="">You are not a Betfin member</div>
			<Drawer>
				<DrawerTrigger asChild>
					<Button size="sm">Mint pass</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Mint a pass</DrawerTitle>
					</DrawerHeader>
					<DrawerDescription className="hidden" />
					<div className="flex flex-col gap-2 justify-between w-full p-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-sm text-muted-foreground">Enter your referral code</h3>
							<Input
								type="text"
								className="w-full "
								value={code}
								onChange={(e) => setCode(e.target.value)}
								placeholder="e.g. 1234567890 or 0x1234567890abcdef"
							/>
							<Button className="w-full rounded-xl" onClick={handleMintPass} disabled={isPending}>
								{isPending ? <LoaderIcon className="size-4 animate-spin" /> : 'Mint a pass'}
							</Button>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
}

export default MemberWarning;
