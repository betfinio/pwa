import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@betfinio/components/ui';
import { usePrivy, type ConnectedWallet } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import {
  DownloadIcon,
  EllipsisVerticalIcon,
  PlugZapIcon,
  TrashIcon,
} from 'lucide-react';

function SingleWallet({ wallet }: { wallet: ConnectedWallet }) {
  const { exportWallet } = usePrivy();
  const { setActiveWallet } = useSetActiveWallet();

  const handleExportWallet = async () => {
    const exportedWallet = await exportWallet({ address: wallet.address });
    console.log(exportedWallet);
  };
  const handleConnectWallet = async () => {
    console.log('connect wallet', wallet.address);
    try {
      await setActiveWallet(wallet);
      console.log('connect wallet success', wallet.address);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-4 w-full border border-border rounded-lg flex items-center justify-between bg-secondary">
      <div className="flex items-center gap-2">
        {wallet.address}
        {wallet.imported && <Badge>Imported</Badge>}
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
