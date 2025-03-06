import { UserCircleIcon } from 'lucide-react';
import { useAccount } from 'wagmi';
import { truncateEthAddress, ZeroAddress } from '@betfinio/abi';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@betfinio/components/ui';

function Wallet() {
  const { address = ZeroAddress } = useAccount();
  return (
    <Drawer direction={'bottom'} shouldScaleBackground={true}>
      <DrawerTrigger asChild>
        <div className="flex flex-row gap-2 items-center border border-border bg-background-lighter p-2 px-4 pr-6 rounded-xl">
          <UserCircleIcon className="w-7 h-7 border border-primary rounded-full" />
          <div className="flex flex-col text-sm leading-none">
            <div className="text-foreground/50">
              {truncateEthAddress(address)}
            </div>
            <div className="text-success">username</div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Wallet;
