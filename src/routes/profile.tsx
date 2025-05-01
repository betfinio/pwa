import { ZeroAddress, truncateEthAddress } from '@betfinio/abi';
import { BetValue } from '@betfinio/components';
import { Blackjack, Staking } from '@betfinio/components/icons';
import { Button, Separator, toast } from '@betfinio/components/ui';
import { useRouter } from '@tanstack/react-router';
import { ChevronLeftIcon, Copy, ExternalLink, MedalIcon, UsersRoundIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { useAccount } from 'wagmi';
import { mfQueryClient } from '../config/query';
import { useRegistrationDate, useTreeMember, useUsername } from '../lib/query/context';
import { useLoadRemoteModule } from '../lib/query/mf';
import type { ContextGlobalsModule } from '../types';

function Profile() {
	const router = useRouter();
	const { address = ZeroAddress } = useAccount();
	const { data: treeMember } = useTreeMember(address);
	const { data: username } = useUsername(address, address);
	const { data: registrationDate = Date.now() } = useRegistrationDate(address);
	const globals = useLoadRemoteModule<ContextGlobalsModule>(mfQueryClient, 'betfinio_context', 'globals');

	// This would normally come from your API/context
	const handleBack = () => {
		router.history.back();
	};

	const handleCopyAddress = () => {
		navigator.clipboard.writeText(address);
		toast.success('Address copied to clipboard');
	};

	return (
		<div className="p-4 flex flex-col gap-4">
			{/* Header */}
			<div className="flex items-center gap-4 justify-center relative">
				<div onClick={handleBack} className="p-2 rounded-lg bg-background-lighter absolute left-0 top-0 cursor-pointer">
					<ChevronLeftIcon className="size-4" />
				</div>
				<h1 className="text-xl font-semibold">My Profile</h1>
			</div>

			{/* Profile Card */}
			<div className="p-4 rounded-2xl border border-border flex flex-col gap-4 bg-background-lighter">
				<div className="flex items-center gap-4">
					<img src="/icon-512.png" alt="Profile" className="w-16 h-16 rounded-full" />
					<div className="flex-1">
						<div className="text-muted-foreground text-sm">Username</div>
						<div className="text-success text-lg font-medium">{username}</div>
					</div>
				</div>
				{/* Wallet & Registration */}
				<div className="flex gap-4 flex-col">
					<div className="flex items-center gap-2 w-full justify-between">
						<div>
							<div className="text-muted-foreground text-sm">Wallet</div>
							<div className="flex items-center gap-2">
								<span>{truncateEthAddress(address)}</span>
							</div>
						</div>
						<div>
							<Button onClick={handleCopyAddress} variant="ghost" size="icon">
								<Copy size={16} className="text-muted-foreground" />
							</Button>
							<a href={`${globals?.ETHSCAN}/address/${address}`} target="_blank" rel="noopener noreferrer">
								<Button variant="ghost" size="icon">
									<ExternalLink size={16} className="text-muted-foreground" />
								</Button>
							</a>
						</div>
					</div>
					<div>
						<div className="text-muted-foreground text-sm">Registration date</div>
						<div>{DateTime.fromMillis(registrationDate ?? 0).toFormat('DD, T')}</div>
					</div>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-2 gap-4">
				<div className="p-4 rounded-2xl bg-background-lighter border border-border flex flex-col gap-4">
					<div className="flex items-center gap-4 justify-between">
						<div className="rounded-full">
							<UsersRoundIcon className="size-6 text-primary" />
						</div>
						<a href={`${globals?.ETHSCAN}/address/${address}`} target="_blank" rel="noopener noreferrer">
							<ExternalLink className="text-muted-foreground size-4" />
						</a>
					</div>
					<div className="">
						<div className="text-sm text-muted-foreground">Inviter</div>
						<div className="font-medium">{truncateEthAddress(treeMember?.inviter ?? ZeroAddress)}</div>
					</div>
				</div>
				<div className="p-4 rounded-2xl bg-background-lighter border border-border flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<MedalIcon className="size-6 text-primary" />
					</div>
					<div className="">
						<div className="text-sm text-muted-foreground">Network</div>
						<div className="font-medium">
							{treeMember?.countDirect} direct / {treeMember?.countLinear} total
						</div>
					</div>
				</div>
			</div>
			<h2 className="text-xl font-semibold">Member's volume</h2>
			{/* Volume Section */}
			<div className="grid grid-cols-2 gap-4">
				<div className="p-4 rounded-2xl bg-background-lighter border border-border flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<Staking className="size-6 text-primary" />
					</div>
					<div className="">
						<div className="text-sm text-muted-foreground">Staking Volume</div>
						<BetValue value={treeMember?.stakingLinear ?? 0n} withIcon />
					</div>
				</div>
				<div className="p-4 rounded-2xl bg-background-lighter border border-border flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<Blackjack className="size-6 text-primary" />
					</div>
					<div className="">
						<div className="text-sm text-muted-foreground">Betting Volume</div>
						<BetValue value={treeMember?.betsLinear ?? 0n} withIcon />
					</div>
				</div>
			</div>

			{/* Network Volume Section */}
			<h2 className="text-xl font-semibold mb-4">Member's network volume</h2>
			<div className="p-4 rounded-2xl bg-background-lighter border border-border">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<div className="text-muted-foreground mb-4">Direct volume</div>
						<div className="space-y-2">
							<div>
								<div className="flex justify-between">
									<BetValue value={treeMember?.volumeDirect ?? 0n} withIcon />
								</div>
								<div className="text-sm text-muted-foreground">total staking</div>
							</div>
							<div>
								<div className="flex justify-between">
									<BetValue value={treeMember?.betsDirect ?? 0n} withIcon />
								</div>
								<div className="text-sm text-muted-foreground">total bets</div>
							</div>
						</div>
					</div>
					<div>
						<div className="text-muted-foreground mb-4">Binary volume</div>
						<div className="space-y-2">
							<div>
								<div className="flex justify-between">
									<BetValue value={treeMember?.volumeLinear ?? 0n} withIcon />
								</div>
								<div className="text-sm text-muted-foreground">total staking</div>
							</div>
							<div>
								<div className="flex justify-between">
									<BetValue value={treeMember?.betsLinear ?? 0n} withIcon />
								</div>
								<div className="text-sm text-muted-foreground">total bets</div>
							</div>
						</div>
					</div>
				</div>
				<Separator className="my-4" />
				<div className="">
					<div className="text-center flex flex-row gap-2 items-center justify-center">
						<BetValue value={treeMember?.totalMatched ?? 0n} withIcon />
						Total matched
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
