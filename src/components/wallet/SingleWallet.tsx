import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import { ContextConfigModule, RemoteModule } from '@/src/types';
import { ZeroAddress, truncateEthAddress } from '@betfinio/abi';
import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@betfinio/components/ui';
import { type ConnectedWallet, usePrivy } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import {
  DownloadIcon,
  EllipsisVerticalIcon,
  PlugZapIcon,
  TrashIcon,
} from 'lucide-react';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

function SingleWallet({ wallet }: { wallet: ConnectedWallet }) {
  const { exportWallet } = usePrivy();
  const { setActiveWallet } = useSetActiveWallet();
  const { address } = useAccount();

  const handleExportWallet = async () => {
    await exportWallet({ address: wallet.address });
  };
  const handleConnectWallet = async () => {
    await setActiveWallet(wallet);
  };

  return (
    <div className="p-4 w-full border border-border rounded-lg flex items-center justify-between bg-secondary">
      <div className="flex items-center gap-2">
        {truncateEthAddress(wallet.address as Address)}
        {wallet.imported && <Badge>Imported</Badge>}
        {address === wallet.address && (
          <Badge className="bg-success text-success-foreground">
            Connected
          </Badge>
        )}
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVerticalIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex items-center gap-2 "
              onClick={handleConnectWallet}
            >
              <PlugZapIcon className="w-4 h-4" /> Connect wallet
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 ">
              <TrashIcon className="w-4 h-4" /> Delete wallet
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 "
              onClick={handleExportWallet}
            >
              <DownloadIcon className="w-4 h-4" /> Export private key
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default SingleWallet;
