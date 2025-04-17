import { ZeroAddress, truncateEthAddress } from '@betfinio/abi';
import { Blackjack, Staking } from '@betfinio/components/icons';
import { Button, toast } from '@betfinio/components/ui';
import { useRouter } from '@tanstack/react-router';
import { ChevronLeftIcon, Copy, ExternalLink, MedalIcon, PenLine, UsersRoundIcon } from 'lucide-react';
import { useAccount } from 'wagmi';
interface ProfileStats {
	username: string;
	wallet: string;
	registrationDate: string;
	inviter: string;
	network: {
		direct: number;
		total: number;
	};
	volume: {
		staking: number;
		betting: number;
	};
	networkVolume: {
		direct: {
			staking: number;
			bets: number;
		};
		binary: {
			staking: number;
			bets: number;
		};
		matchingVolume: number;
	};
}

function Profile() {
	const { address = ZeroAddress } = useAccount();
	const router = useRouter();

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success('Copied to clipboard');
	};

	// This would normally come from your API/context
	const profileData: ProfileStats = {
		username: 'BF.tom',
		wallet: '0x26E...8adbDc5',
		registrationDate: '2 Dec 2025 21:15',
		inviter: '0x26E2...F3FfD',
		network: {
			direct: 5,
			total: 112,
		},
		volume: {
			staking: 698.7,
			betting: 115,
		},
		networkVolume: {
			direct: {
				staking: 100000.0,
				bets: 100000.0,
			},
			binary: {
				staking: 100000.0,
				bets: 100000.0,
			},
			matchingVolume: 320000.0,
		},
	};

	const handleBack = () => {
		router.history.back();
	};

	return (
		<div className="p-4 flex flex-col gap-4">
			{/* Header */}
			<div className="flex items-center gap-4 justify-center relative">
				<div onClick={handleBack} className="p-2 rounded-lg bg-gray-800/50 absolute left-0 top-0 cursor-pointer">
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
						<div className="text-success text-lg font-medium">{profileData.username}</div>
					</div>
					<Button variant="secondary" className="gap-2 px-4 py-2" size="freeSize">
						Edit <PenLine className="size-4" />
					</Button>
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
							<Button onClick={() => copyToClipboard(profileData.wallet)} variant="ghost" size="icon">
								<Copy size={16} className="text-muted-foreground" />
							</Button>
							<Button variant="ghost" size="icon">
								<ExternalLink size={16} className="text-muted-foreground" />
							</Button>
						</div>
					</div>
					<div>
						<div className="text-muted-foreground text-sm">Registration date</div>
						<div>{profileData.registrationDate}</div>
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
						<ExternalLink size={16} className="text-muted-foreground" />
					</div>
					<div className="">
						<div className="text-sm text-muted-foreground">Inviter</div>
						<div className="font-medium">{profileData.inviter}</div>
					</div>
				</div>
				<div className="p-4 rounded-2xl bg-background-lighter border border-border flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<MedalIcon className="size-6 text-primary" />
					</div>
					<div className="">
						<div className="text-sm text-muted-foreground">Network</div>
						<div className="font-medium">
							{profileData.network.direct} direct / {profileData.network.total} total
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
						<div className="font-medium">{profileData.volume.staking} BET</div>
					</div>
				</div>
				<div className="p-4 rounded-2xl bg-background-lighter border border-border flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<Blackjack className="size-6 text-primary" />
					</div>
					<div className="">
						<div className="text-sm text-muted-foreground">Betting Volume</div>
						<div className="font-medium">{profileData.volume.betting} BET</div>
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
									<span>{profileData.networkVolume.direct.staking.toFixed(2)} BET</span>
								</div>
								<div className="text-sm text-muted-foreground">total staking</div>
							</div>
							<div>
								<div className="flex justify-between">
									<span>{profileData.networkVolume.direct.bets.toFixed(2)} BET</span>
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
									<span>{profileData.networkVolume.binary.staking.toFixed(2)} BET</span>
								</div>
								<div className="text-sm text-muted-foreground">total staking</div>
							</div>
							<div>
								<div className="flex justify-between">
									<span>{profileData.networkVolume.binary.bets.toFixed(2)} BET</span>
								</div>
								<div className="text-sm text-muted-foreground">total bets</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-4 pt-4 border-t border-gray-800">
					<div className="text-center text-yellow-500">{profileData.networkVolume.matchingVolume.toFixed(2)} BET matching volume</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
