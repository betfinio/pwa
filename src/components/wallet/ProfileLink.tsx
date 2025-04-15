import { useIsMember } from '@/src/lib/query/context';
import { ZeroAddress, truncateEthAddress } from '@betfinio/abi';
import { BetLogo } from '@betfinio/components/icons';
import { cn } from '@betfinio/components/lib';
import { Link } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useAccount } from 'wagmi';
import MemberWarning from './MemberWarning';

function ProfileLink() {
	const { address = ZeroAddress } = useAccount();

	const { data: isMember = null } = useIsMember(address);

	if (!isMember && isMember !== null) {
		return <MemberWarning />;
	}

	return (
		<Link to="/profile">
			<motion.div
				whileTap={{ scale: 0.97 }}
				className={cn(
					'flex flex-row gap-2 justify-between items-center border border-border rounded-xl p-4 bg-background-lighter cursor-pointer transition-all duration-300',
					{
						'blur-sm': isMember === null,
					},
				)}
			>
				<div className="flex flex-row gap-2 items-center">
					<div className="rounded-full border border-success p-1">
						<BetLogo className="size-6" />
					</div>
					<div className="flex flex-col">
						<div className="font-semibold text-lg leading-5">My Profile</div>
						<div className="text-xs text-muted-foreground">{truncateEthAddress(address)}</div>
					</div>
				</div>
				<div className="bg-white/20 rounded-lg p-1">
					<ChevronRightIcon className="size-5" />
				</div>
			</motion.div>
		</Link>
	);
}

export default ProfileLink;
