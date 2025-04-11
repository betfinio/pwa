import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@betfinio/components';
import {
  Bet,
  BetfinLogo,
  Lobby,
  LuckyRound,
  Predict,
  Roulette,
  Stones,
  Ticket,
} from '@betfinio/components/icons';
import { Link } from '@tanstack/react-router';
import {
  BookOpenIcon,
  ChartAreaIcon,
  ChevronDownIcon,
  HeadphonesIcon,
  MessageCircleIcon,
} from 'lucide-react';
import { mfQueryClient } from '../config/query';
import { useContextManifest } from '../lib/query/mf';

const gameLinks: Record<string, string> = {
  roulette: '/games/roulette/live',
  'roulette-single': '/games/roulette/single',
  'roulette-90': '/games/roulette/live/90',
  'roulette-180': '/games/roulette/live/180',
  predict: '/games/predict',
  stones: '/games/stones',
  luro: '/games/luro',
  'luro-5m': '/games/luro/5m',
  'luro-1d': '/games/luro/1d',
  lottery: '/games/lottery/lotto',
};
const stakingLinks: Record<string, string> = {
  staking: '/staking',
  'staking-conservative': '/staking/conservative',
  'staking-dynamic': '/staking/dynamic',
};
const affiliateLinks: Record<string, string> = {
  affiliate: '/affiliate',
  'affiliate-linear-tree': '/affiliate/linear',
  'affiliate-binary-tree': '/affiliate/binary',
};
const academyLinks: Record<string, string> = {
  academy: '/academy',
};

const CustomSidebar = () => {
  const { data: manifest } = useContextManifest(mfQueryClient);
  if (!manifest) return null;
  return (
    <Sidebar variant="floating" collapsible="icon" className="block">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <BetfinLogo className="w-24" />
          <SidebarTrigger />
        </div>
        <Separator />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="gap-2">
          <Button
            variant="outline"
            className="w-full rounded-lg border-primary gap-1"
          >
            <Bet className="w-4 h-4 text-primary" />
            Buy BET
          </Button>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Lobby" asChild>
              <Link to="/app">
                <Lobby />
                <span>Lobby</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Crypto Predict" asChild>
              <Link to="/games/predict">
                <Predict />
                <span>Crypto Predict</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel>
                <CollapsibleTrigger className="flex gap-2 p-2 h-10 w-full items-center">
                  <Roulette className="w-4 h-4" />
                  <span>Roulette</span>
                  <div className="flex grow justify-end">
                    <ChevronDownIcon className="w-4 h-4 bg-foreground/20 rounded-xs transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </div>
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent className="gap-1 flex flex-col bg-sidebar-item/10 p-2 rounded-lg rounded-t-none">
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="1.5 mins" asChild>
                      <Link to={gameLinks['roulette-90']}>
                        <span>1.5 min</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="3 mins" asChild>
                      <Link to={gameLinks['roulette-180']}>
                        <span>3 min</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Single player" asChild>
                      <Link to="/games/roulette/single">
                        <span>Single player</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel>
                <CollapsibleTrigger className="flex gap-2 p-2 h-10 w-full items-center">
                  <LuckyRound className="w-4 h-4" />
                  <span>Lucky Round</span>
                  <div className="flex grow justify-end">
                    <ChevronDownIcon className="w-4 h-4 bg-foreground/20 rounded-xs transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </div>
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent className="gap-1 flex flex-col bg-sidebar-item/10 p-2 rounded-lg rounded-t-none">
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="5 mins" asChild>
                      <Link to={gameLinks['luro-5m']}>
                        <span>5 min</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="1 day" asChild>
                      <Link to={gameLinks['luro-1d']}>
                        <span>1 day</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Stones" asChild>
              <Link to={gameLinks.stones}>
                <Stones />
                <span>Stones</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Lotto" asChild>
              <Link to={gameLinks.lottery}>
                <Ticket className="text-foreground" />
                <span>Lotto</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Documentation">
              <BookOpenIcon className="text-foreground" />
              <span>Documentation</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Statistics" asChild>
              <Link to="/statistics">
                <ChartAreaIcon className="text-foreground" />
                <span>Statistics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="FAQ">
              <MessageCircleIcon className="text-foreground" />
              <span>FAQ</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Support">
              <HeadphonesIcon className="text-foreground" />
              <span>Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* <Select value={language}>
            <SelectTrigger className="w-full" minimized={minimized}>
              <div className={'flex flex-row items-center justify-start gap-2'}>
                <Globe className={cn('w-4 h-4')} />
                <SelectValue placeholder={'Language'} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {Object.keys(languages).map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {languages[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CustomSidebar;
